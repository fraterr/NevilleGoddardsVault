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
    
    # Remove tags like #Assumption
    # We use a pattern that matches # followed by a letter, then word characters
    # But only if not preceded by a word character
    # Also handle the fact that removing tags might leave empty lines
    # First, let's remove lines that ONLY contain tags and whitespace
    content = re.sub(r'^[ \t]*(?:#[A-Za-z][A-Za-z0-9_-]*[ \t]*)+\n?', '', content, flags=re.MULTILINE)
    
    # Then remove any remaining inline tags
    content = re.sub(r'(?<!\w)#[A-Za-z][A-Za-z0-9_-]*', '', content)
    
    # Clean up multiple trailing newlines
    content = content.rstrip() + '\n'
    
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
            if f in ['Books.md', 'Lectures.md', 'Tags.md']:
                continue
                
            filepath = os.path.join(root, f)
            total += 1
            if process_file(filepath):
                modified_count += 1
                
    print(f"Removed tags from {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
