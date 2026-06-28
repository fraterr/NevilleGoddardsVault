import os

CONTENT_DIR = os.path.join(os.getcwd(), "content")
SKIP_NAMES = {'.DS_Store', '.trash', 'Handles', 'Template', 'Context', '.obsidian'}

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except UnicodeDecodeError:
        try:
            with open(filepath, 'r', encoding='windows-1252') as f:
                lines = f.readlines()
        except:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                lines = f.readlines()
    
    new_lines = []
    modified = False
    for line in lines:
        # Strip blockquote syntax added by the quotes.py script
        if line.startswith('> '):
            new_lines.append(line[2:])
            modified = True
        elif line.startswith('>'):
            new_lines.append(line[1:])
            modified = True
        else:
            new_lines.append(line)
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        return True
    return False

def main():
    print("Removing blockquote markers (>) from all documents...")
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
                
    print(f"Done! Modified {modified_count} out of {total} files.")

if __name__ == "__main__":
    main()
