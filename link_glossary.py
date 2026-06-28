import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

# Map terms to their anchor links
TERMS = {
    "Abdullah": "abdullah",
    "Assumption": "assumption",
    r"Christ": "christ",
    "Diet": "diet",
    "Feeling": "feeling",
    r"God": "god",
    r"I AM": "i-am",
    "Imagination": "imagination",
    "Revision": "revision",
    "Sabbath": "sabbath",
    r"State\b(?!\s*of\s*New\s*York)": "state", # basic exclusion, though not strictly necessary
    "The Law": "the-law",
    "The Promise": "the-promise"
}

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
    
    # Hide existing links, image tags, and headers to avoid corrupting them
    hidden = []
    
    def hide(m):
        hidden.append(m.group(0))
        return f"__HIDDEN_{len(hidden)-1}__"
        
    # Hide markdown links and images [text](url) or ![alt](url)
    content = re.sub(r'!?\[.*?\]\(.*?\)', hide, content)
    
    # Hide HTML tags
    content = re.sub(r'<[^>]+>', hide, content)
    
    # Hide Headers
    content = re.sub(r'^#+ .*$', hide, content, flags=re.MULTILINE)
    
    # Replace terms (first occurrence only)
    for term, slug in TERMS.items():
        # Match word boundaries, case-insensitive. But for "I AM", we strictly match case "I AM".
        if term == r"I AM":
            pattern = re.compile(rf'\b({term})\b')
        else:
            pattern = re.compile(rf'\b({term})\b', re.IGNORECASE)
            
        # We only want to replace the first occurrence
        def replacer(m):
            return f"[{m.group(1)}](/glossary#{slug})"
            
        content = pattern.sub(replacer, content, count=1)
    
    # Restore hidden elements
    for i, h in reversed(list(enumerate(hidden))):
        content = content.replace(f"__HIDDEN_{i}__", h)
        
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
            # Skip Glossary itself
            if f == 'Glossary.md':
                continue
                
            filepath = os.path.join(root, f)
            total += 1
            if process_file(filepath, f):
                modified_count += 1
                
    print(f"Added glossary links to {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
