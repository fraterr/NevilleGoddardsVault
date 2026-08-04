import os
import re

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

# Simple regex to find anything that looks like a Bible reference:
# e.g., "1Corinthians 15:47", "John 3:16", "1 John 2:3", "II Cor 5:17"
# We want to see what is NOT currently a markdown link.
TEST_REGEX = re.compile(
    r'\b((?:[123]\s*|I{1,3}\s*)?[A-Z][a-z]+(?:\s+of\s+[A-Z][a-z]+)?\s*\d+:\d+(?:-\d+)?)\b'
)

def main():
    unlinked = []
    linked = []
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_NAMES]
        for f in files:
            if not f.endswith('.md'):
                continue
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8', errors='replace') as file:
                content = file.read()
                
            # Find all potential refs
            matches = TEST_REGEX.findall(content)
            for m in matches:
                # Check if this match is inside a markdown link: [m](url)
                # We can search for the match in the content and check if it has a `]` after it and `[` before it,
                # or we can write a quick parser.
                # A simple check: is it preceded by "[" and followed by "]"?
                # Let's do a strict regex search for linkified version:
                link_pattern = re.escape(m) + r'\]\(http'
                if re.search(link_pattern, content):
                    linked.append(m)
                else:
                    unlinked.append((f, m))
                    
    print(f"Total potential refs found: {len(linked) + len(unlinked)}")
    print(f"Linked: {len(linked)}")
    print(f"Unlinked: {len(unlinked)}")
    print("\nSample of Unlinked references:")
    for f, m in unlinked[:30]:
        print(f"  - in '{f}': {m}")

if __name__ == "__main__":
    main()
