
import json
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

from scratch_answers import SCRATCH_ANSWERS_LIST

INPUT_JSON = "scratch_dump.json"
OUTPUT_PDF = "Scratch_Answer_Key.pdf"

def generate_pdf():
    with open(INPUT_JSON, "r") as f:
        questions = json.load(f)
        
    doc = SimpleDocTemplate(OUTPUT_PDF, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    
    q_style = ParagraphStyle('Q', parent=styles['Normal'], spaceAfter=10, leading=14)
    a_style = ParagraphStyle('A', parent=styles['Normal'], spaceAfter=20, textColor=colors.blue)
    
    story.append(Paragraph("Scratch Answer Key", styles['Heading1']))
    story.append(Spacer(1, 12))
    
    # Check length mismatch
    if len(questions) != len(SCRATCH_ANSWERS_LIST):
        print(f"Warning: Question count {len(questions)} != Answer count {len(SCRATCH_ANSWERS_LIST)}")
    
    for i, q in enumerate(questions):
        text = q["text"].replace('\n', ' ')
        # Check bound
        if i < len(SCRATCH_ANSWERS_LIST):
            ans_letter = SCRATCH_ANSWERS_LIST[i]
            ans_text = f"Answer: {ans_letter}"
        else:
            ans_text = "Answer: [Not Found]"
            
        story.append(Paragraph(f"<b>Q{i+1}:</b> {text}", q_style))
        story.append(Paragraph(f"<b>{ans_text}</b>", a_style))
        
    doc.build(story)
    print(f"Generated PDF with {len(questions)} items.")

if __name__ == "__main__":
    generate_pdf()
