import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}
GREEN_COLOR = "#4ade80"

def strip_previous_colors(content):
    """Strip all previously injected style tags around quotes."""
    content = re.sub(
        r'<span style="color:\s*[^>]+>([\s\S]*?)</span>',
        r'\1',
        content
    )
    return content

def color_bible_quotes(content):
    paragraphs = content.split('\n')
    new_paragraphs = []
    
    # Regex to match quotes.
    # Group 1: The quote itself including optional asterisks and quotes.
    # We use a negative lookbehind/lookahead for HTML tags so we don't mess up existing tags.
    # We match:
    # 1. Double quotes (regular or curly), optionally with asterisks.
    # 2. Single quotes, optionally with asterisks, but only at word boundaries to avoid apostrophes.
    
    quote_pattern = re.compile(
        r'(\*?["“].*?["”]\*?|(?<=\W)\*?\'.*?\'\*?(?=\W)|(?<=^)\*?\'.*?\'\*?(?=$)|(?<=\W)\*?".*?\'\*?(?=\W))'
    )
    
    for p in paragraphs:
        if 'biblegateway.com/passage' in p:
            # We found a paragraph with a bible link.
            # We need to wrap all quotes in this paragraph with the span.
            # However, we must be careful not to wrap the biblegateway link itself or parts of it!
            # The link looks like [text](https://www.biblegateway.com/...)
            
            # To avoid replacing inside links, we can split the string into text and links,
            # or we can just find all matches and only replace if they are not part of the link.
            
            # Let's temporally hide the markdown links
            links = []
            def hide_link(m):
                links.append(m.group(0))
                return f"__LINK_{len(links)-1}__"
                
            p_hidden = re.sub(r'\[.*?\]\(https?://[^\)]+\)', hide_link, p)
            
            def replacer(m):
                text = m.group(1)
                # If it's too short, probably not a bible quote
                if len(text) < 5:
                    return text
                return f'<span style="color: {GREEN_COLOR};">{text}</span>'
                
            p_colored = quote_pattern.sub(replacer, p_hidden)
            
            # Restore links
            for i, link in enumerate(links):
                p_colored = p_colored.replace(f"__LINK_{i}__", link)
                
            new_paragraphs.append(p_colored)
        else:
            new_paragraphs.append(p)
            
    return '\n'.join(new_paragraphs)

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
    
    content = strip_previous_colors(content)
    content = color_bible_quotes(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
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
                
    print(f"Colored quotes in {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
