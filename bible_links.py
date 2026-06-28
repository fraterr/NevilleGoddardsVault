import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

# Dynamic pattern generation for Bible books and abbreviations
BIBLE_BOOKS_SETUP = [
    # Song of Solomon / Songs
    (r"Song\s*of\s*Solomon", "Song of Solomon"),
    (r"Song\s*of\s*Songs", "Song of Songs"),
    
    # Corinthians
    (r"(?:1|I|1st)\s*Cor(?:\.|inthians)?", "1 Corinthians"),
    (r"(?:2|II|2nd)\s*Cor(?:\.|inthians)?", "2 Corinthians"),
    
    # Thessalonians
    (r"(?:1|I|1st)\s*Thess(?:\.|alonians)?", "1 Thessalonians"),
    (r"(?:2|II|2nd)\s*Thess(?:\.|alonians)?", "2 Thessalonians"),
    
    # Chronicles
    (r"(?:1|I|1st)\s*Chron(?:\.|icles)?", "1 Chronicles"),
    (r"(?:2|II|2nd)\s*Chron(?:\.|icles)?", "2 Chronicles"),
    
    # Timothy
    (r"(?:1|I|1st)\s*Tim(?:\.|othy)?", "1 Timothy"),
    (r"(?:2|II|2nd)\s*Tim(?:\.|othy)?", "2 Timothy"),
    
    # Samuel
    (r"(?:1|I|1st)\s*Sam(?:\.|uel)?", "1 Samuel"),
    (r"(?:2|II|2nd)\s*Sam(?:\.|uel)?", "2 Samuel"),
    
    # Kings
    (r"(?:1|I|1st)\s*Ki(?:\.|ngs)?", "1 Kings"),
    (r"(?:2|II|2nd)\s*Ki(?:\.|ngs)?", "2 Kings"),
    
    # Peter
    (r"(?:1|I|1st)\s*Pet(?:\.|er)?", "1 Peter"),
    (r"(?:2|II|2nd)\s*Pet(?:\.|er)?", "2 Peter"),
    
    # John
    (r"(?:1|I|1st)\s*Jn(?:\.|ohn)?", "1 John"),
    (r"(?:2|II|2nd)\s*Jn(?:\.|ohn)?", "2 John"),
    (r"(?:3|III|3rd)\s*Jn(?:\.|ohn)?", "3 John"),
    
    # Single-word books with common abbreviations
    (r"Gen(?:\.|esis)?", "Genesis"),
    (r"Exod(?:\.|us)?|Ex(?:\.|odus)?", "Exodus"),
    (r"Lev(?:\.|iticus)?", "Leviticus"),
    (r"Num(?:\.|bers)?", "Numbers"),
    (r"Deut(?:\.|eronomy)?", "Deuteronomy"),
    (r"Josh(?:\.|ua)?", "Joshua"),
    (r"Judg(?:\.|es)?", "Judges"),
    (r"Ruth", "Ruth"),
    (r"Ezra", "Ezra"),
    (r"Neh(?:\.|emiah)?", "Nehemiah"),
    (r"Esth(?:\.|er)?", "Esther"),
    (r"Job", "Job"),
    (r"Psa?lms?\.?|Psa\.", "Psalms"),
    (r"Prov(?:\.|erbs)?", "Proverbs"),
    (r"Eccl(?:\.|esiastes)?", "Ecclesiastes"),
    (r"Isa(?:\.|iah)?", "Isaiah"),
    (r"Jer(?:\.|emiah)?", "Jeremiah"),
    (r"Lam(?:\.|entations)?", "Lamentations"),
    (r"Ezek(?:\.|iel)?", "Ezekiel"),
    (r"Dan(?:\.|iel)?", "Daniel"),
    (r"Hos(?:\.|ea)?", "Hosea"),
    (r"Joel", "Joel"),
    (r"Amos?", "Amos"),
    (r"Obad(?:\.|iah)?", "Obadiah"),
    (r"Jonah?", "Jonah"),
    (r"Mic(?:\.|ah)?", "Micah"),
    (r"Nah(?:\.|um)?", "Nahum"),
    (r"Hab(?:\.|akkuk)?", "Habakkuk"),
    (r"Zeph(?:\.|aniah)?", "Zephaniah"),
    (r"Hag(?:\.|gai)?", "Haggai"),
    (r"Zech(?:\.|ariah)?", "Zechariah"),
    (r"Mal(?:\.|achi)?", "Malachi"),
    (r"Matt?\.?|Mat\.", "Matthew"),
    (r"Mk(?:\.|ark)?", "Mark"),
    (r"Lk(?:\.|uke)?", "Luke"),
    (r"Jn(?:\.|ohn)?|Joh\.", "John"),
    (r"Acts?\.?|Act\.", "Acts"),
    (r"Rom(?:\.|ans)?", "Romans"),
    (r"Gal(?:\.|ations)?", "Galatians"),
    (r"Eph(?:\.|esians)?", "Ephesians"),
    (r"Phil(?:\.|ippians)?", "Philippians"),
    (r"Col(?:\.|ossians)?", "Colossians"),
    (r"Tit(?:\.|us)?", "Titus"),
    (r"Philem(?:\.|on)?", "Philemon"),
    (r"Heb(?:\.|rews)?", "Hebrews"),
    (r"Jas(?:\.|ames)?", "James"),
    (r"Jude", "Jude"),
    (r"Rev(?:\.|elation)?", "Revelation"),
    (r"Peter", "Peter"), # general fallback
]

def clean_existing_bible_links(content):
    """Strip existing Bible Gateway links so we don't double-link or break formatting."""
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
    
    pattern = (
        r'(?<!\[)'                     # Not already inside a markdown link
        r'('
        r'\b(?:' + books_pattern + r')' # Book name or abbreviation
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
    
    for pattern, clean_name in BIBLE_BOOKS_SETUP:
        # Match case insensitively
        match = re.match(r'^' + pattern + r'\s*(.*)$', search, re.IGNORECASE)
        if match:
            remaining = match.group(match.lastindex if match.lastindex else 1)
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
    
    content = clean_existing_bible_links(content)
    content = linkify_bible_refs(content, regex)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Building Bible regex with abbreviation support...")
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
