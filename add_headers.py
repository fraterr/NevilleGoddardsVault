import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

def process_file(filepath, filename):
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
    
    title = filename[:-3] # remove .md
    
    # 1. Add title to header
    lines = content.lstrip().split('\n')
    if len(lines) > 0 and not lines[0].startswith('# '):
        # Prepend the title as an h1
        content = f"# {title}\n\n" + content.lstrip()
    elif len(lines) > 0 and lines[0].startswith('# '):
        # It already has an h1, let's make sure it's the title (or just leave it if it's close enough)
        # If it's something generic like # Chapter 1, we might want to replace it, but let's just leave existing H1s.
        pass

    # 2. Standardize "Summary" heading
    # Find things like ## Summary:, ### Summary, ## SUMMARY, # Summary
    # and replace with ## Summary
    content = re.sub(r'(?i)^(#{1,4})\s*summary:?\s*$', r'## Summary', content, flags=re.MULTILINE)
    
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
            if process_file(filepath, f):
                modified_count += 1
                
    print(f"Added headers to {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
