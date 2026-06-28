import os
import re
import json
import yaml

VAULT_DIR = r"c:\Users\Io\Documents\Antigravity\Neville Goddard\Neville Goddard Vault"
OUTPUT_PATH = r"c:\Users\Io\Documents\Antigravity\Neville Goddard\neville-vault\src\data\metadata.json"

def clean_val(val):
    if val is None:
        return []
    if isinstance(val, list):
        return [str(v).strip() for v in val if v]
    # If it's a comma-separated string, or just a string
    val_str = str(val).strip()
    if val_str.startswith('[') and val_str.endswith(']'):
        try:
            # try to parse as list
            return [v.strip() for v in json.loads(val_str.replace("'", '"'))]
        except:
            pass
    if ',' in val_str:
        return [v.strip() for v in val_str.split(',') if v.strip()]
    return [val_str] if val_str else []

def get_metadata():
    docs = []
    
    # Pre-calculate file mapping to build slugs
    file_map = {}
    for root, dirs, files in os.walk(VAULT_DIR):
        for f in files:
            if f.endswith('.md') and not f.startswith('.'):
                rel_path = os.path.relpath(os.path.join(root, f), VAULT_DIR)
                slug = rel_path[:-3].replace('\\', '/').split('/')
                # If folder note (e.g. Books/Books.md), slug should just be ['Books']
                if len(slug) >= 2 and slug[-1] == slug[-2]:
                    slug = slug[:-1]
                file_map[f] = slug

    for root, dirs, files in os.walk(VAULT_DIR):
        for f in files:
            if f.endswith('.md') and not f.startswith('.'):
                filepath = os.path.join(root, f)
                rel_path = os.path.relpath(filepath, VAULT_DIR)
                slug = file_map[f]
                
                # Try reading frontmatter
                try:
                    with open(filepath, 'r', encoding='utf-8') as file:
                        content = file.read()
                except UnicodeDecodeError:
                    try:
                        with open(filepath, 'r', encoding='windows-1252') as file:
                            content = file.read()
                    except:
                        continue
                
                frontmatter = {}
                # Match yaml frontmatter
                match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
                if match:
                    try:
                        frontmatter = yaml.safe_load(match.group(1)) or {}
                    except Exception as e:
                        print(f"Error parsing yaml in {f}: {e}")
                
                # Determine type
                doc_type = "other"
                if "Lectures" in rel_path:
                    if "Radio Lectures" in rel_path:
                        doc_type = "radio_lecture"
                    else:
                        doc_type = "lecture"
                elif "Books" in rel_path:
                    doc_type = "book_chapter" if "-" in f else "book"
                
                doc_title = f[:-3]
                
                docs.append({
                    "title": doc_title,
                    "slug": slug,
                    "book": str(frontmatter.get("book", "")).strip() or None,
                    "chapter": str(frontmatter.get("chapter", "")).strip() or None,
                    "type": doc_type,
                    "bible_ref": clean_val(frontmatter.get("bible_ref")),
                    "tags": clean_val(frontmatter.get("tags")),
                    "topics": clean_val(frontmatter.get("topics")),
                    "keywords": clean_val(frontmatter.get("keywords"))
                })
                
    return docs

if __name__ == "__main__":
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    metadata = get_metadata()
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print(f"Extracted metadata for {len(metadata)} documents to {OUTPUT_PATH}")
