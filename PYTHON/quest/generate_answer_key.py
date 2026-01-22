import json
import re
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

INPUT_JSON = "questions_dump.json"
OUTPUT_PDF = "Answer_Key.pdf"

def parse_extra_questions(text):
    """
    Parses questions formatted as 'Que 1: ... (A) ...' from a text block.
    """
    pattern = r'(Que\s*\d+:.*?)(?=\sQue\s*\d+:|$)'
    matches = re.finditer(pattern, text, re.DOTALL)
    extra_qs = []
    
    for m in matches:
        q_text = m.group(1).strip()
        # Extract number?
        num_match = re.match(r'Que\s*(\d+):', q_text)
        num = int(num_match.group(1)) if num_match else 0
        extra_qs.append({"number": num, "text": q_text})
        
    return extra_qs

def solve_question(text):
    """
    Heuristic solver to determine the answer based on keywords.
    """
    text_lower = text.lower()
    
    # regex to find options
    # Layouts: "a) ... b) ..." or "A. ... B. ..."
    options = {}
    
    # Try pattern a) b)
    parts = re.split(r'\s+[a-d]\)\s+', text)
    if len(parts) < 2:
        # Try pattern A. B.
        parts = re.split(r'\s+[A-D]\.\s+', text)
    
    # If we still can't split options, we can't answer easily
    # But let's try to identify content
    
    # Knowledge Base (Keyword -> Correct Answer Content)
    kb = {
        "extension": ".py",
        "output": ["print", "show", "display"],
        "mutable": ["list", "set", "dict", "dictionary"],
        "immutable": ["tuple", "string", "str", "int"],
        "function": ["def", "lambda"],
        "package": ["pip", "install"],
        "array": ["numpy", "np.array"],
        "pandas": ["dataframe", "series"],
        "matplotlib": ["plot", "pyplot"],
        "comment": ["#"],
        "power": ["**"],
        "exponentiation": ["**"],
        "division": ["/"],
        "floor": ["//"],
        "input": ["input()"],
        "constructor": ["__init__"],
        "inheritance": ["class", "parent"],
        "class": ["class"],
        "terminates": ["break"],
        "skip": ["continue"],
        "random": ["random"],
        "sqrt": ["math.sqrt"],
        "length": ["len"],
        "add element": ["append", "add"],
        "dictionary": ["key", "value", "{}"],
        "set": ["unique", "unordered", "set()"],
        "tuple": ["()", "immutable"],
        "list": ["[]", "mutable"],
        "print": ["print()"],
        "type": ["type()"],
        "virtual env": ["venv"],
        "identity": ["id()", "is"],
        "read csv": ["read_csv"],
        "head": ["first 5 rows"],
        "tail": ["last 5 rows"],
        "shape": ["dimensions"],
        "describe": ["summary statistics", "statistics"],
        "merge": ["merge"],
        "concat": ["concat"],
        "init": ["__init__"],
        "self": ["instance", "current object"],
        "super": ["parent", "super()"],
        "lambda": ["anonymous"],
        "yield": ["generator"],
        "map": ["apply function"],
        "filter": ["filter"],
        "reduce": ["reduce"],
        "zip": ["combine"],
        "range": ["range"],
        "len": ["length", "count"],
        "open": ["open()"],
        "close": ["close()"],
        "read": ["read()"],
        "write": ["write()"],
        "append": ["append()"],
        "exception": ["try", "except", "raise"],
        "error": ["syntax", "runtime", "type"],
        "import": ["import"],
        "from": ["from"],
        "as": ["alias"],
        "pass": ["null operation", "nothing"],
        "none": ["none"],
        "true": ["true"],
        "false": ["false"],
        "and": ["and"],
        "or": ["or"],
        "not": ["not"],
        "is": ["is"],
        "in": ["in"],
        "global": ["global"],
        "local": ["local"],
        "nonlocal": ["nonlocal"],
        "assert": ["assert"],
        "del": ["delete"],
        "with": ["context manager"],
        "async": ["await"],
        "await": ["async"],
        "return": ["return"],
        "break": ["break"],
        "continue": ["continue"],
    }

    # Find probable answer in text
    predicted_answer = None
    
    # 1. Identify the question topic
    # 2. Look for the "correct" keyword in the question (this is hard)
    # Better: Scan the question for a "target" concept, then look for that concept in the full text to see if it appears in an "option" position.
    
    # Simple heuristic: Correct answer usually contains the keyword related to the question keyword.
    
    # Let's map certain question phrases to answers directly
    # "extension for python" -> ".py"
    if "extension" in text_lower and "python" in text_lower:
        return "Answer Reference: .py"
    if "mutable" in text_lower:
        return "Answer Reference: List / Dictionary / Set"
    if "immutable" in text_lower:
        return "Answer Reference: Tuple / String"
    if "define a function" in text_lower:
        return "Answer Reference: def"
    if "install a package" in text_lower:
        return "Answer Reference: pip install"
    if "output" in text_lower and "type(10)" in text_lower:
        return "Answer Reference: <class 'int'>"
    if "symbol for comments" in text_lower:
        return "Answer Reference: #"
        
    # Default fallback
    return "Answer: [Check Concept]"

from answer_data import ANSWERS
from answer_data_2 import ANSWERS_2
from answer_data_3 import ANSWERS_3

# Merge all answers
ALL_ANSWERS = {**ANSWERS, **ANSWERS_2, **ANSWERS_3}

def generate_pdf(questions):
    doc = SimpleDocTemplate(OUTPUT_PDF, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    
    q_style = ParagraphStyle('Q', parent=styles['Normal'], spaceAfter=10, leading=14)
    a_style = ParagraphStyle('A', parent=styles['Normal'], spaceAfter=20, textColor='blue')
    
    story.append(Paragraph("Answer Key", styles['Heading1']))
    story.append(Spacer(1, 12))
    
    count = 1
    for q in questions:
        q_text = q['text'].replace('\n', ' ')
        
        # Lookup Answer
        # Try to use the question number from extraction or just sequential
        # The extraction 'q["number"]' might reset (e.g. 1-20, then 1-20).
        # But my ANSWERS dict is sequential 1-241 based on the dump order.
        # So I should use the loop `count`.
        
        answer_text = ALL_ANSWERS.get(count, "Answer not found.")
        
        story.append(Paragraph(f"<b>Q{count}:</b> {q_text}", q_style))
        story.append(Paragraph(f"<b>Answer: {answer_text}</b>", a_style))
        count += 1
        
    doc.build(story)
    print(f"Generated PDF with {len(questions)} items.")

from answer_data_images import IMAGE_QUESTIONS

def main():
    with open(INPUT_JSON, "r") as f:
        data = json.load(f)
        
    # Process the last item if it's a blob
    final_questions = []
    
    for item in data:
        # Check if this item is the massive blob
        if "Que 1:" in item["text"]:
            # Parse it
            # First, separate the part BEFORE "Que 1"
            parts = item["text"].split("Que 1:", 1)
            if parts[0].strip():
                final_questions.append({"number": item["number"], "text": parts[0].strip()})
            
            # Now parse the blob
            blob = "Que 1:" + parts[1]
            extracted = parse_extra_questions(blob)
            final_questions.extend(extracted)
        else:
            final_questions.append(item)
            
    # APPEND IMAGE QUESTIONS
    start_idx = len(final_questions) + 1
    for i, img_q in enumerate(IMAGE_QUESTIONS):
        idx = start_idx + i
        final_questions.append({
            "number": idx,
            "text": img_q["text"]
        })
        ALL_ANSWERS[idx] = img_q["answer"]

    print(f"Total resolved questions: {len(final_questions)}")
    
    with open("final_questions.json", "w") as f:
        json.dump(final_questions, f, indent=2)

    generate_pdf(final_questions)

if __name__ == "__main__":
    main()
