import os
import re

# We will run this script from inside neville-vault
CONTENT_DIR = os.path.join(os.getcwd(), "content")

# Pre-compute file paths for link resolution
file_map = {}
for root, dirs, files in os.walk(CONTENT_DIR):
    for f in files:
        if f.endswith('.md'):
            # Store the basename without extension and the relative path
            basename = f[:-3]
            rel_path = os.path.relpath(os.path.join(root, f), CONTENT_DIR)
            # Replace backslashes with forward slashes for URLs
            url_path = rel_path[:-3].replace('\\', '/')
            file_map[basename] = url_path

def resolve_wikilink(match):
    inner = match.group(1)
    if '|' in inner:
        link, alias = inner.split('|', 1)
    else:
        link = inner
        alias = inner
    
    # Try to find the link in our file map
    if link in file_map:
        # Standard markdown link
        return f"[{alias}](/{file_map[link]})"
    else:
        # Fallback if file doesn't exist
        fallback_path = link.strip().replace(' ', '-')
        return f"[{alias}](/{fallback_path})"

def sanitize_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(filepath, 'r', encoding='windows-1252') as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()

    original_content = content

    # 1. Remove YAML Frontmatter
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)
    
    # Also catch cases where frontmatter might not be at the very start due to BOM or empty lines
    content = re.sub(r'\A\s*---\n.*?\n---\n', '', content, flags=re.DOTALL)

    # 2. Replace Wikilinks
    # [[Link|Alias]] or [[Link]]
    content = re.sub(r'\[\[(.*?)\]\]', resolve_wikilink, content)

    # 3. Remove Obsidian Block References (e.g., ^1a2b3c)
    content = re.sub(r'\s+\^[a-zA-Z0-9]{4,8}$', '', content, flags=re.MULTILINE)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content.strip() + '\n')
        return True
    return False

if __name__ == "__main__":
    modified_count = 0
    for root, dirs, files in os.walk(CONTENT_DIR):
        for f in files:
            if f.endswith('.md'):
                filepath = os.path.join(root, f)
                if sanitize_file(filepath):
                    modified_count += 1
    
    print(f"Sanitization complete. Modified {modified_count} files.")
