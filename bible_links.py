import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

# All Bible book names (ordered longest first to avoid partial matches)
BIBLE_BOOKS = [
    # Multi-word / numbered books (longest first)
    "Song of Solomon", "Song of Songs",
    "1 Corinthians", "2 Corinthians",
    "1 Thessalonians", "2 Thessalonians",
    "1 Chronicles", "2 Chronicles",
    "1 Timothy", "2 Timothy",
    "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings",
    "1 Peter", "2 Peter",
    "1 John", "2 John", "3 John",
    # Single-word books
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth",
    "Ezra", "Nehemiah", "Esther",
    "Job", "Psalms", "Psalm", "Proverbs", "Ecclesiastes",
    "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
    "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
    "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John",
    "Acts", "Romans",
    "Galatians", "Ephesians", "Philippians", "Colossians",
    "Titus", "Philemon", "Hebrews", "James",
    "Jude", "Revelation",
]

def build_bible_regex():
    """Build a regex that matches Bible references like 'John 3:16' or 'Genesis 1:1-3'."""
    # Escape book names and join with |
    books_pattern = '|'.join(re.escape(b) for b in BIBLE_BOOKS)
    
    # Pattern: BookName Chapter:Verse (with optional ranges, commas, etc.)
    # Examples matched:
    #   John 3:16
    #   John 3:16-18
    #   John 3:16,17
    #   Genesis 1:1-2:3
    #   Psalms 23:1-6
    #   1 Corinthians 13:1
    #   Isaiah 53:3
    pattern = (
        r'(?<!\[)'           # Not already inside a markdown link
        r'('
        r'(?:' + books_pattern + r')'   # Book name
        r'\s+'                           # Space
        r'\d+'                           # Chapter number
        r'(?:'                           # Optional verse part
        r':\d+'                          # :verse
        r'(?:\s*[-–]\s*\d+(?::\d+)?)?'   # Optional range -verse or -chapter:verse
        r'(?:\s*,\s*\d+(?::\d+)?)*'      # Optional comma-separated additional verses
        r')?'
        r')'
        r'(?!\])'            # Not already inside a markdown link
    )
    return pattern

def make_bible_url(reference):
    """Generate a BibleGateway URL for a given Bible reference."""
    # Clean up the reference for URL encoding
    search = reference.strip()
    # Replace spaces with +
    search_encoded = search.replace(' ', '+').replace('–', '-')
    return f"https://www.biblegateway.com/passage/?search={search_encoded}&version=KJV"

def linkify_bible_refs(content):
    """Find Bible references and wrap them in hyperlinks to BibleGateway."""
    pattern = build_bible_regex()
    
    def replace_ref(match):
        ref = match.group(1)
        url = make_bible_url(ref)
        return f'[{ref}]({url})'
    
    # Only process lines that are body text (not headings, code, etc.)
    lines = content.split('\n')
    result_lines = []
    in_code_block = False
    
    for line in lines:
        stripped = line.strip()
        
        # Track code blocks
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            result_lines.append(line)
            continue
        
        if in_code_block or stripped.startswith('#') or stripped.startswith('---'):
            result_lines.append(line)
            continue
        
        # Apply Bible reference linking
        line = re.sub(pattern, replace_ref, line)
        result_lines.append(line)
    
    return '\n'.join(result_lines)

def process_file(filepath):
    """Process a single markdown file."""
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
    content = linkify_bible_refs(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Scanning all documents for Bible references...")
    
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
    
    print(f"\nBible reference linking complete!")
    print(f"  Processed: {total} files")
    print(f"  Modified:  {modified_count} files")

if __name__ == "__main__":
    main()
