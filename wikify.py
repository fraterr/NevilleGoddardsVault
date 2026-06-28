import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")

# Folders/files to skip entirely (not real content)
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}
SKIP_FILES = {'kitrc.md', '_kitrc.md', 'Books.md', 'Lectures.md', 'Search.md', 
              'Topics.md', 'Keywords.md', 'Bible References.md', 'Radio Lectures.md',
              '.md'}

# Common words that happen to be lecture titles but are too generic to auto-link
# These would create noise if every occurrence got linked
SKIP_TITLES = {
    'Imagination', 'Faith', 'Freedom', 'Arise', 'Conception', 'Perception',
    'Fundamentals', 'Redemption', 'Reconciliation', 'Summary', 'Truth',
    'Meditation', 'The Law', 'The Father', 'The Creator', 'The Source',
    'The Rock', 'The Gospel', 'The Revealer', 'The Crucifixion',
    'Follow Me', 'My Word', 'His Name', 'The Talent',
}

def slugify(text):
    return re.sub(r'(^-|-$)+', '', re.sub(r'[^a-z0-9]+', '-', text.lower()))

def build_file_index():
    """Build a map of document title -> slugified URL path."""
    index = {}
    for root, dirs, files in os.walk(CONTENT_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_NAMES]
        
        for f in files:
            if not f.endswith('.md') or f.startswith('.') or f.startswith('_'):
                continue
            if f in SKIP_FILES:
                continue
                
            title = f[:-3]  # Remove .md
            
            # Skip titles that are too generic
            if title in SKIP_TITLES:
                continue
            # Skip very short titles (4 chars or less)
            if len(title) <= 4:
                continue
                
            rel_path = os.path.relpath(os.path.join(root, f), CONTENT_DIR)
            parts = rel_path[:-3].replace('\\', '/').split('/')
            slug_path = '/'.join(slugify(p) for p in parts)
            
            index[title] = slug_path
    
    return index

def strip_internal_links(content):
    """Remove all internal markdown links, keep display text. Preserve external links."""
    def strip_link(m):
        display = m.group(1)
        url = m.group(2)
        if url.startswith('http://') or url.startswith('https://'):
            return m.group(0)
        return display
    
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', strip_link, content)
    # Remove leftover wikilinks
    content = re.sub(r'\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]', 
                     lambda m: m.group(2) or m.group(1), content)
    return content

def wikify_document(content, file_index, self_title):
    """Insert Wikipedia-style links: only the FIRST occurrence per document, per title."""
    
    # Sort titles by length (longest first) to match specific titles before generic ones
    titles_sorted = sorted(file_index.keys(), key=len, reverse=True)
    
    linked_titles = set()
    
    # Process line by line, only wikify body text
    lines = content.split('\n')
    result_lines = []
    
    for line in lines:
        stripped = line.strip()
        # Skip headings, code blocks, HTML, separators, empty lines
        if (stripped.startswith('#') or 
            stripped.startswith('```') or
            stripped.startswith('<') or
            stripped == '' or
            stripped.startswith('---') or
            stripped.startswith('|')):
            result_lines.append(line)
            continue
        
        # For body text lines, try to insert links
        for title in titles_sorted:
            if title == self_title:
                continue
            if title in linked_titles:
                continue
            
            slug_path = file_index[title]
            
            # Build pattern: match the title as a standalone phrase
            # Not inside markdown formatting, links, or quotes
            escaped = re.escape(title)
            # Word boundary match - title must appear as a distinct phrase
            pattern = r'(?<!\[)(?<!\()(?<![/])' + escaped + r'(?!\])(?!\))(?![/])'
            
            match = re.search(pattern, line, re.IGNORECASE)
            if match:
                matched_text = match.group(0)
                replacement = f'[{matched_text}](/{slug_path})'
                # Replace only this first match in this line
                line = line[:match.start()] + replacement + line[match.end():]
                linked_titles.add(title)
        
        result_lines.append(line)
    
    return '\n'.join(result_lines)

def process_file(filepath, file_index):
    """Process a single markdown file."""
    filename = os.path.basename(filepath)
    self_title = filename[:-3]
    
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
    
    # Step 1: Strip all existing internal links
    content = strip_internal_links(content)
    
    # Step 2: Wikify with intelligent cross-references
    content = wikify_document(content, file_index, self_title)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Building file index...")
    file_index = build_file_index()
    print(f"Found {len(file_index)} linkable documents in index.")
    print(f"Skipped {len(SKIP_TITLES)} generic titles to avoid noise.")
    
    for i, (title, slug) in enumerate(sorted(file_index.items())[:5]):
        print(f"  - '{title}' -> /{slug}")
    print(f"  ... and {len(file_index) - 5} more")
    
    modified_count = 0
    total = 0
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_NAMES]
        
        for f in files:
            if not f.endswith('.md') or f.startswith('.') or f.startswith('_'):
                continue
            
            filepath = os.path.join(root, f)
            total += 1
            
            if process_file(filepath, file_index):
                modified_count += 1
    
    print(f"\nWikification complete!")
    print(f"  Processed: {total} files")
    print(f"  Modified:  {modified_count} files")

if __name__ == "__main__":
    main()
