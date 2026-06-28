import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

GREEN_COLOR = "#4ade80"

def strip_previous_colors(content):
    """Strip all previously injected style tags around quotes."""
    # Matches <span style="color: ...">*"Quote"*</span> and restores to *"Quote"*
    # We use [^>]+ to allow any variation of the color style
    content = re.sub(
        r'<span style="color:[^>]+">(\*?["“].*?["”]\*?)</span>',
        r'\1',
        content,
        flags=re.DOTALL
    )
    return content

def color_bible_quotes(content):
    """Color all quotes that are followed closely by a Bible reference.
    
    Regex matches:
    Group 1: The quote wrapped optionally in asterisks
    Group 2: The separator (up to 80 chars, no newlines or quotes, to allow text like "approx.," or "see")
    Group 3: The Bible gateway link (starting with [Book Chapter:Verse](url))
    """
    pattern = re.compile(
        r'(\*?["“][^"”]+["”]\*?)([^\n"”]{0,80}?)(\[[^\]]+\]\(https://www\.biblegateway\.com/passage/[^)]+\))',
        re.DOTALL
    )
    
    def replacer(match):
        quote = match.group(1)
        sep = match.group(2)
        link = match.group(3)
        
        # Check if already styled
        if "color:" in quote:
            return match.group(0)
            
        return f'<span style="color: {GREEN_COLOR};">{quote}</span>{sep}{link}'
        
    return pattern.sub(replacer, content)

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(filepath, 'r', encoding='windows-1252') as f:
                content = f.read()
        except:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
                
    original = content
    
    # 1. Clean previous colors
    content = strip_previous_colors(content)
    # 2. Apply robust coloring
    content = color_bible_quotes(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Coloring Bible quotes in markdown files...")
    modified_count = 0
    total = 0
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_NAMES]
        for f in files:
            if not f.endswith('.md') or f.startswith('.') or f.startswith('_'):
                continue
            filepath = os.path.join(root, f)
            total += 1
            if process_file(filepath):
                modified_count += 1
                
    print(f"\nDone! Colored quotes in {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
