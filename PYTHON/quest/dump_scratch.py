import fitz
import json
import re

INPUT_FILE = "Final-QuestionBankForScratchProgramming.pdf"
OUTPUT_JSON = "scratch_dump.json"

def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

def main():
    doc = fitz.open(INPUT_FILE)
    questions = []
    
    # Regex to capture "1. ..." or "Que 1: ..."
    # The previous regex worked well for numbered lists.
    # Q start: Digits + dot or "Que" + Digits
    q_start_pattern = re.compile(r'^\s*(?:Que\s*)?(\d+)[\.:]\s+(.*)', re.DOTALL)
    
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    # Split by double newline or regex lookahead to find starts?
    # Actually, simpler to iterate lines.
    
    lines = full_text.split('\n')
    current_q = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        m = q_start_pattern.match(line)
        if m:
            # Save previous
            if current_q:
                questions.append(current_q)
                
            current_q = {
                "number": int(m.group(1)),
                "text": m.group(0) # Start with full line
            }
        else:
            if current_q:
                current_q["text"] += " " + line
                
    if current_q:
        questions.append(current_q)
        
    print(f"Extracted {len(questions)} questions.")
    
    with open(OUTPUT_JSON, "w") as f:
        json.dump(questions, f, indent=2)

if __name__ == "__main__":
    main()
