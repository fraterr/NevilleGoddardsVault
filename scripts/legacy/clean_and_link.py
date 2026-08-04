import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

BIBLE_BOOKS = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", 
    "1 Samuel", "2 Samuel", "I Samuel", "II Samuel", "1 Kings", "2 Kings", "I Kings", "II Kings", 
    "1 Chronicles", "2 Chronicles", "I Chronicles", "II Chronicles", "Ezra", "Nehemiah", "Esther", 
    "Job", "Psalm", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Song of Songs", 
    "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", 
    "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", 
    "I Corinthians", "II Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", 
    "1 Thessalonians", "2 Thessalonians", "I Thessalonians", "II Thessalonians", "1 Timothy", 
    "2 Timothy", "I Timothy", "II Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", 
    "2 Peter", "I Peter", "II Peter", "1 John", "2 John", "3 John", "I John", "II John", "III John", 
    "Jude", "Revelation", "Eccl", "Dan", "Jer", "Sam", "Wisdom", "Prov", "Matt", "Rom", "Cor", "Gal", "Eph", "Phil", "Col", "Thess", "Tim", "Heb", "Rev"
]

def strip_previous_colors(content):
    """Strip all previously injected style tags around quotes."""
    content = re.sub(
        r'<span style="color:\s*[^>]+>([\s\S]*?)</span>',
        r'\1',
        content
    )
    return content

def add_bible_links(content):
    # Hide existing markdown links
    links = []
    def hide_link(m):
        links.append(m.group(0))
        return f"__LINK_{len(links)-1}__"
        
    content_hidden = re.sub(r'\[.*?\]\(https?://[^\)]+\)', hide_link, content)
    
    # Create pattern
    # Match Bookname Chapter or Bookname Chapter:Verse or Bookname Chapter:Verse-Verse
    books_regex = r'\b(?:' + '|'.join(BIBLE_BOOKS).replace(' ', r'\s+') + r')\s+\d+(?:[:\.]\d+(?:-\d+)?)?\b'
    bible_pattern = re.compile(books_regex, re.IGNORECASE)
    
    def link_replacer(m):
        passage = m.group(0)
        # Avoid linking if it's already part of a link we didn't hide, but we hid all [..](..)
        search_query = passage.replace(' ', '+')
        return f'[{passage}](https://www.biblegateway.com/passage/?search={search_query}&version=KJV)'
        
    content_linked = bible_pattern.sub(link_replacer, content_hidden)
    
    # Restore links
    for i, link in enumerate(links):
        content_linked = content_linked.replace(f"__LINK_{i}__", link)
        
    return content_linked

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
    content = add_bible_links(content)
    
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
                
    print(f"Cleaned quotes and linked bible passages in {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
