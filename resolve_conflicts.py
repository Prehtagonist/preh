import re
import os

def resolve_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to match conflict blocks
        # <<<<<<< HEAD
        # ... (keep this)
        # =======
        # ... (discard this)
        # >>>>>>> ...
        
        # We use re.DOTALL to match across newlines
        pattern = re.compile(r'<<<<<<< HEAD\n(.*?)\n=======\n.*?\n>>>>>>> .*?\n', re.DOTALL)
        
        # Replace with just the HEAD content
        resolved_content = pattern.sub(r'\1', content)
        
        # Also handle edge case where it might not have newlines exactly as expected
        # or if the file ends right after
        
        # Determine if changes were made
        if content != resolved_content:
            print(f"Resolving conflicts in {filepath}")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(resolved_content)
        else:
            print(f"No HEAD conflicts found in {filepath} with standard pattern.")
            
            # Try a robust line-by-line approach if regex failed or for safety
            lines = content.splitlines(keepends=True)
            new_lines = []
            in_conflict = False
            keeping = False
            
            resolved = False
            
            for line in lines:
                if line.startswith('<<<<<<< HEAD'):
                    in_conflict = True
                    keeping = True
                    resolved = True
                    continue
                if line.startswith('======='):
                    if in_conflict:
                        keeping = False
                        continue
                if line.startswith('>>>>>>> '):
                    if in_conflict:
                        in_conflict = False
                        keeping = False
                        continue
                
                if in_conflict:
                    if keeping:
                        new_lines.append(line)
                else:
                    new_lines.append(line)
            
            if resolved:
                print(f"Resolved conflicts in {filepath} using line-by-line method.")
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.writelines(new_lines)

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

resolve_file('styles.css')
resolve_file('vercel.json')
