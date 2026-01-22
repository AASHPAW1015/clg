import PyPDF2
import re
import json

INPUT_FILE = "Final - QuestionBankForPython.pdf"
OUTPUT_JSON = "questions_dump.json"

def extract_all():
    text = ""
    try:
        reader = PyPDF2.PdfReader(INPUT_FILE)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error: {e}")
        return

    # Clean text
    # Remove excessive newlines but keep some structure
    clean_text = re.sub(r'\n+', ' ', text)
    
    # Regex for "1. ", "10. ", "100. "
    # We want to catch the number and the text until the next number
    pattern = r'(\d+\.\s.*?)(?=\s\d+\.\s|$)'
    matches = re.finditer(pattern, clean_text)
    
    questions = []
    for m in matches:
        q_text = m.group(1).strip()
        # Parse the number
        q_num = int(q_text.split('.')[0])
        questions.append({
            "number": q_num,
            "text": q_text
        })
        
    print(f"Extracted {len(questions)} questions.")
    
    with open(OUTPUT_JSON, "w") as f:
        json.dump(questions, f, indent=2)

if __name__ == "__main__":
    extract_all()
