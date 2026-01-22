from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import json
from git_answers import GIT_ANSWERS

INPUT_JSON = "git_dump.json"
OUTPUT_PDF = "Git_Answer_Key.pdf"

def generate_pdf(questions):
    doc = SimpleDocTemplate(OUTPUT_PDF, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    
    q_style = ParagraphStyle('Q', parent=styles['Normal'], spaceAfter=10, leading=14)
    a_style = ParagraphStyle('A', parent=styles['Normal'], spaceAfter=20, textColor='blue')
    
    story.append(Paragraph("Git MCQ Answer Key", styles['Heading1']))
    story.append(Spacer(1, 12))
    
    count = 1
    for q in questions:
        q_text = q['text'].replace('\n', ' <br/> ')
        
        # Determine Answer
        # We try to get from GIT_ANSWERS
        answer_key = GIT_ANSWERS.get(q['number'], "Answer not found")
        
        story.append(Paragraph(f"<b>Q{q['number']}:</b> {q_text}", q_style))
        story.append(Paragraph(f"<b>Answer: {answer_key}</b>", a_style))
        count += 1
        
    doc.build(story)
    print(f"Generated PDF with {len(questions)} items.")

def main():
    with open(INPUT_JSON, "r") as f:
        questions = json.load(f)
        
    print(f"Loaded {len(questions)} questions.")
    
    # Sort just in case
    questions.sort(key=lambda x: x['number'])
    
    generate_pdf(questions)

if __name__ == "__main__":
    main()
