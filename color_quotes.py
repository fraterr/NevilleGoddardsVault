import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

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
    
    # Pattern to match:
    # 1. Quote: optionally starting with *, then ", then anything but ", then ", optionally ending with *
    # 2. Optional whitespace
    # 3. BibleGateway link
    
    # We use a non-greedy match for the quote content: .*?
    # but to avoid matching across long text, we ensure it's on the same line or similar.
    # Actually, [^"]+ is safer so we match the immediately preceding quote.
    
    pattern = r'(\*?"[^"]+"\*?)\s*(\(\[[^\]]+\]\(https://www.biblegateway\.com/passage/[^)]+\)\))'
    
    # We want to keep the markdown asterisks outside the span so react-markdown still renders them if needed,
    # or we can just wrap the whole thing.
    # We will use an inline style to ensure it works regardless of CSS modules.
    
    def replacer(match):
        quote_text = match.group(1)
        link_text = match.group(2)
        # Check if already wrapped
        if "color: var(--accent-green)" in quote_text or "#4ade80" in quote_text:
            return match.group(0)
            
        return f'<span style="color: #4ade80;">{quote_text}</span> {link_text}'
        
    content = re.sub(pattern, replacer, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Coloring Bible quotes...")
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
                
    print(f"Done! Colored quotes in {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
