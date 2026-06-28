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
    lines = content.split('\n')
    result_lines = []
    
    for line in lines:
        # If the line starts with *" or " or *“ (with optional leading spaces)
        # We will convert it into a blockquote if it isn't one already.
        
        # Match lines starting with *", "*", or just " if the line seems to be a full quote
        stripped = line.lstrip()
        if stripped.startswith('*"') or stripped.startswith('*“'):
            # It's a quote line! Prepend with "> "
            line = '> ' + line
        
        result_lines.append(line)
    
    content = '\n'.join(result_lines)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Converting standalone quotes to blockquotes...")
    
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
    
    print(f"\nQuote conversion complete!")
    print(f"  Processed: {total} files")
    print(f"  Modified:  {modified_count} files")

if __name__ == "__main__":
    main()
