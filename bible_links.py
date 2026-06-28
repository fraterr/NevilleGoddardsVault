import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

# Dynamic pattern generation for Bible books
# We support:
# - Optional space for numbered books (e.g. 1Corinthians and 1 Corinthians)
# - Roman numerals (e.g. I Corinthians, II Peter)
# - Standard single-word books
# - Fallback for "Peter" to mean "1 Peter" or "2 Peter" if written as just "Peter 3:1"
BIBLE_BOOKS_SETUP = [
    # Multi-word / Numbered Books
    (r"Song\s*of\s*Solomon", "Song of Solomon"),
    (r"Song\s*of\s*Songs", "Song of Songs"),
    (r"(?:1|I|1st)\s*Corinthians", "1 Corinthians"),
    (r"(?:2|II|2nd)\s*Corinthians", "2 Corinthians"),
    (r"(?:1|I|1st)\s*Thessalonians", "1 Thessalonians"),
    (r"(?:2|II|2nd)\s*Thessalonians", "2 Thessalonians"),
    (r"(?:1|I|1st)\s*Chronicles", "1 Chronicles"),
    (r"(?:2|II|2nd)\s*Chronicles", "2 Chronicles"),
    (r"(?:1|I|1st)\s*Timothy", "1 Timothy"),
    (r"(?:2|II|2nd)\s*Timothy", "2 Timothy"),
    (r"(?:1|I|1st)\s*Samuel", "1 Samuel"),
    (r"(?:2|II|2nd)\s*Samuel", "2 Samuel"),
    (r"(?:1|I|1st)\s*Kings", "1 Kings"),
    (r"(?:2|II|2nd)\s*Kings", "2 Kings"),
    (r"(?:1|I|1st)\s*Peter", "1 Peter"),
    (r"(?:2|II|2nd)\s*Peter", "2 Peter"),
    (r"(?:1|I|1st)\s*John", "1 John"),
    (r"(?:2|II|2nd)\s*John", "2 John"),
    (r"(?:3|III|3rd)\s*John", "3 John"),
    
    # Single word books
    (r"Genesis", "Genesis"),
    (r"Exodus", "Exodus"),
    (r"Leviticus", "Leviticus"),
    (r"Numbers", "Numbers"),
    (r"Deuteronomy", "Deuteronomy"),
    (r"Joshua", "Joshua"),
    (r"Judges", "Judges"),
    (r"Ruth", "Ruth"),
    (r"Ezra", "Ezra"),
    (r"Nehemiah", "Nehemiah"),
    (r"Esther", "Esther"),
    (r"Job", "Job"),
    (r"Psalms", "Psalms"),
    (r"Psalm", "Psalm"),
    (r"Proverbs", "Proverbs"),
    (r"Ecclesiastes", "Ecclesiastes"),
    (r"Isaiah", "Isaiah"),
    (r"Jeremiah", "Jeremiah"),
    (r"Lamentations", "Lamentations"),
    (r"Ezekiel", "Ezekiel"),
    (r"Daniel", "Daniel"),
    (r"Hosea", "Hosea"),
    (r"Joel", "Joel"),
    (r"Amos", "Amos"),
    (r"Obadiah", "Obadiah"),
    (r"Jonah", "Jonah"),
    (r"Micah", "Micah"),
    (r"Nahum", "Nahum"),
    (r"Habakkuk", "Habakkuk"),
    (r"Zephaniah", "Zephaniah"),
    (r"Haggai", "Haggai"),
    (r"Zechariah", "Zechariah"),
    (r"Malachi", "Malachi"),
    (r"Matthew", "Matthew"),
    (r"Mark", "Mark"),
    (r"Luke", "Luke"),
    (r"John", "John"),
    (r"Acts", "Acts"),
    (r"Romans", "Romans"),
    (r"Galatians", "Galatians"),
    (r"Ephesians", "Ephesians"),
    (r"Philippians", "Philippians"),
    (r"Colossians", "Colossians"),
    (r"Titus", "Titus"),
    (r"Philemon", "Philemon"),
    (r"Hebrews", "Hebrews"),
    (r"James", "James"),
    (r"Jude", "Jude"),
    (r"Revelation", "Revelation"),
    (r"Peter", "Peter"), # Fallback for "Peter 3:1"
]

def clean_existing_bible_links(content):
    """Strip existing Bible Gateway links so we don't double-link or break formatting."""
    # [John 1:3](https://...) -> John 1:3
    content = re.sub(
        r'\[([^\]]+)\]\(https://www\.biblegateway\.com/passage/[^)]+\)',
        r'\1',
        content
    )
    return content

def build_bible_regex():
    """Build a regex that matches Bible references."""
    # We join all book regex patterns with |
    books_pattern = '|'.join(f'(?:{pattern})' for pattern, _ in BIBLE_BOOKS_SETUP)
    
    # Matching: BookName Chapter:Verse (with optional ranges, commas, etc.)
    # Note: we use \s* after the book pattern to allow "1Corinthians" and similar
    # to be followed immediately by chapter if space is missing (though usually there is a space).
    # Actually, "1Corinthians 15:47" has a space between "1Corinthians" and "15:47".
    # So we require \s+ if the book name ends with a letter, but since book names in our pattern
    # end with letters, we require at least some spacing or separator, which \s* allows if chapter is digits.
    # To prevent "John" matching "John" in general, it must be followed by chapter/verse.
    
    pattern = (
        r'(?<!\[)'                     # Not already inside a markdown link
        r'('
        r'\b(?:' + books_pattern + r')' # Book name
        r'\s+'                         # At least one space (or separator)
        r'\d+'                         # Chapter number
        r'(?:'                         # Optional verse part
        r':\d+'                        # :verse
        r'(?:\s*[-–]\s*\d+(?::\d+)?)?' # Optional range
        r'(?:\s*,\s*\d+(?::\d+)?)*'    # Optional comma-separated additional verses
        r')?'
        r')'
        r'(?!\])'                     # Not already inside a markdown link
    )
    return re.compile(pattern, re.IGNORECASE)

def make_bible_url(reference):
    """Generate BibleGateway URL. Normalize book names for BibleGateway search."""
    search = reference.strip()
    
    # BibleGateway likes standard spaces and book names. We clean the search string.
    # For example, if it matched "1Corinthians 15:47", we should make it "1 Corinthians 15:47"
    for pattern, clean_name in BIBLE_BOOKS_SETUP:
        # Match case insensitively
        match = re.match(r'^' + pattern + r'\s*(.*)$', search, re.IGNORECASE)
        if match:
            remaining = match.group(match.lastindex)
            search = f"{clean_name} {remaining}"
            break
            
    search_encoded = search.replace(' ', '+').replace('–', '-')
    return f"https://www.biblegateway.com/passage/?search={search_encoded}&version=KJV"

def linkify_bible_refs(content, regex):
    """Find Bible references and wrap them in hyperlinks."""
    
    def replace_ref(match):
        ref = match.group(1)
        url = make_bible_url(ref)
        return f'[{ref}]({url})'
        
    lines = content.split('\n')
    result_lines = []
    in_code_block = False
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            result_lines.append(line)
            continue
        if in_code_block or stripped.startswith('#') or stripped.startswith('---'):
            result_lines.append(line)
            continue
            
        line = regex.sub(replace_ref, line)
        result_lines.append(line)
        
    return '\n'.join(result_lines)

def process_file(filepath, regex):
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
    
    # 1. Clean existing Bible Gateway links
    content = clean_existing_bible_links(content)
    # 2. Add new Bible links
    content = linkify_bible_refs(content, regex)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Building Bible regex...")
    regex = build_bible_regex()
    
    print("Scanning files for Bible references...")
    modified_count = 0
    total = 0
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_NAMES]
        for f in files:
            if not f.endswith('.md') or f.startswith('.') or f.startswith('_'):
                continue
            filepath = os.path.join(root, f)
            total += 1
            if process_file(filepath, regex):
                modified_count += 1
                
    print(f"\nDone! Modified {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
