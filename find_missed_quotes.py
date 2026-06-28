import os
import re
import sys

# Force UTF-8 stdout to avoid Windows encoding crashes
sys.stdout.reconfigure(encoding='utf-8')

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

# Permissive regex: Quote followed by any characters on the same line, then a Bible link
PERMISSIVE_REGEX = re.compile(
    r'(\*?["“][^"”\n]+["”]\*?)([^\n]*?)(\[[^\]]+\]\(https://www\.biblegateway\.com/passage/[^)]+\))',
    re.DOTALL
)

def main():
    missed = []
    total_matches = 0
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_NAMES]
        for f in files:
            if not f.endswith('.md'):
                continue
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8', errors='replace') as file:
                content = file.read()
                
            matches = list(PERMISSIVE_REGEX.finditer(content))
            for m in matches:
                quote = m.group(1)
                separator = m.group(2)
                link = m.group(3)
                total_matches += 1
                
                # Check if this quote is colored
                if "color: #4ade80" not in quote:
                    # It's not colored! Let's record it and see why.
                    missed.append({
                        "file": f,
                        "quote": quote.strip(),
                        "separator": separator,
                        "link": link,
                        "sep_len": len(separator)
                    })
                    
    print(f"Total permissive matches found: {total_matches}")
    print(f"Total uncolored quotes followed by Bible links: {len(missed)}")
    print("\nFirst 30 uncolored cases:")
    for idx, case in enumerate(missed[:30]):
        print(f"{idx+1}. File: {case['file']}")
        print(f"   Quote: {case['quote']}")
        print(f"   Separator (len {case['sep_len']}): {repr(case['separator'])}")
        print(f"   Link: {case['link']}")
        print("-" * 50)

if __name__ == "__main__":
    main()
