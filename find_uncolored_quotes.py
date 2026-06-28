import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

# Match any Bible link: [Book Chapter:Verse](url)
LINK_REGEX = re.compile(r'\[([^\]]+)\]\(https://www\.biblegateway\.com/passage/[^)]+\)')

def main():
    missed = []
    total_links = 0
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_NAMES]
        for f in files:
            if not f.endswith('.md'):
                continue
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8', errors='replace') as file:
                lines = file.readlines()
                
            for idx, line in enumerate(lines):
                # Find all links on this line
                matches = list(LINK_REGEX.finditer(line))
                if matches:
                    total_links += len(matches)
                    
                    # For each link, check if there is a quote before it that is NOT colored
                    # We check if the line contains a quote (" or “) but no green span,
                    # or if the quote preceding the link is not colored.
                    
                    # Let's see if the line has a quote
                    if '"' in line or '“' in line:
                        # If it has a quote, but does NOT contain the green color style,
                        # it's a potential missed quote.
                        if 'color: #4ade80' not in line:
                            missed.append((f, idx + 1, line.strip()))
                            
    print(f"Total Bible Gateway links found: {total_links}")
    print(f"Total lines with quotes near Bible links but NOT colored: {len(missed)}")
    print("\nSamples:")
    for f, line_no, text in missed[:30]:
        print(f"  - {f}:{line_no}: {text}")

if __name__ == "__main__":
    main()
