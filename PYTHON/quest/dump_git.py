import fitz
import json
import re

INPUT_FILE = "Git MCQ.pdf"
OUTPUT_JSON = "git_dump.json"

def main():
    try:
        doc = fitz.open(INPUT_FILE)
    except Exception as e:
        print(f"Error opening file: {e}")
        return

    questions = []
    
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    full_text = full_text.replace('\u200b', '').replace('\u200c', '')
    
    questions = []
    
    def find_question_start(text, number, start_search_idx):
        # Look for pattern: space/newline + number + dot
        # e.g. " 10." or "\n10." or start of string "10."
        # Also handle "10.GitHub" (no space) case seen in dump
        # Regex: (?:^|\s) + number + \.
        pattern = re.compile(rf"(?:^|\s)({number})\.")
        match = pattern.search(text, start_search_idx)
        return match

    # Find Q1
    m1 = find_question_start(full_text, 1, 0)
    if not m1:
        print("Critical: Could not find Question 1")
        return

    current_start_idx = m1.end() # Start of Q1 text
    current_num = 1
    
    # We loop attempting to find 2, 3, ... 120 (+ buffer)
    # We stop if we can't find next few numbers
    
    while True:
        next_num = current_num + 1
        m_next = find_question_start(full_text, next_num, current_start_idx)
        
        if m_next:
            # Found next question. Current question text is between current_start_idx and m_next.start()
            q_text_raw = full_text[current_start_idx : m_next.start()].strip()
            
            # Clean up text (remove leading spaces)
            q_full = f"{current_num}. {q_text_raw}"
            
            questions.append({
                "number": current_num,
                "text": q_full
            })
            
            current_num = next_num
            current_start_idx = m_next.end()
        else:
            # Could not find next number.
            # Maybe we are at the end?
            # Or maybe we missed one?
            print(f"Stopping at Question {current_num}. Next marker '{next_num}.' not found.")
            
            # Capture the last question
            q_text_raw = full_text[current_start_idx:].strip()
            questions.append({
                "number": current_num,
                "text": f"{current_num}. {q_text_raw}"
            })
            break
            
    print(f"Extracted {len(questions)} questions.")
        
    print(f"Extracted {len(questions)} questions.")
    
    with open(OUTPUT_JSON, "w") as f:
        json.dump(questions, f, indent=2)

if __name__ == "__main__":
    main()
