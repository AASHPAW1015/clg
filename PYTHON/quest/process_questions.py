import re
import fitz  # PyMuPDF
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as PlatypusImage, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

INPUT_FILE = "Final - QuestionBankForPython.pdf"
OUTPUT_FILE = "Sorted_Questions.pdf"
IMAGE_DIR = "extracted_images"

# Concept Definitions (Keywords)
CONCEPTS = {
    "Object-Oriented Programming (OOP)": ["class", "object", "inheritance", "polymorphism", "encapsulation", "constructor", "method", "__init__", "self", "instance"],
    "Data Structures": ["list", "tuple", "set", "dictionary", "dict", "array", "map", "hash", "key-value", "duplicate", "mutable", "immutable"],
    "Functions & Generators": ["def", "function", "lambda", "generator", "yield", "recursion", "argument", "parameter", "return", "decorator"],
    "Modules & Libraries": ["import", "module", "package", "library", "pip", "install", "math", "random", "numpy", "pandas"],
    "File Handling": ["open", "read", "write", "file", "close", "mode", "with statement", "exception"],
    "Python Basics": ["variable", "type", "print", "syntax", "indentation", "comment", "operator", "loop", "if", "else", "break", "continue", "input"]
}

def extract_content(filename):
    """
    Extracts questions and associated images using PyMuPDF.
    Returns a list of dicts: {'text': str, 'images': [path, path]}
    """
    if not os.path.exists(IMAGE_DIR):
        os.makedirs(IMAGE_DIR)
        
    doc = fitz.open(filename)
    questions = []
    current_q = {"text": "", "images": []}
    
    # Regex to identify start of a new question (e.g., "1. ", "50. ")
    # Matches start of line digit+dot+space
    q_start_pattern = re.compile(r'^\s*(\d+)\.\s')

    img_counter = 0

    for page_num, page in enumerate(doc):
        # Get blocks: text and images
        blocks = page.get_text("blocks")
        # Blocks format: (x0, y0, x1, y1, "text", block_no, block_type)
        # block_type: 0 for text, 1 for image
        
        # Sort blocks vertically first, then horizontally
        blocks.sort(key=lambda b: (b[1], b[0]))
        
        for b in blocks:
            b_type = b[6]
            
            if b_type == 0:  # Text block
                text = b[4].strip()
                if not text: 
                    continue
                
                match = q_start_pattern.match(text)
                if match:
                    # Found a new question block
                    # Save the previous question if it has meaningful content
                    if current_q["text"] or current_q["images"]:
                        questions.append(current_q)
                    
                    # Start new question
                    current_q = {"text": text, "images": []}
                else:
                    # Append text to current question (continuation)
                    # Add a space if needed
                    if current_q["text"]:
                        current_q["text"] += " " + text
                    else:
                        current_q["text"] += text
                        
            elif b_type == 1:  # Image block
                # Save image to disk
                img_filename = f"{IMAGE_DIR}/img_{page_num}_{img_counter}.png"
                
                # Check if it's an inline image (byte stream)
                # pymupdf block doesn't give raw bytes directly easily for "blocks"
                # But we can extract images from page list if we knew xref. 
                # Block extraction gives simple placeholder often. 
                # better approach for robust image extraction in flow:
                # Iterate page.get_images() and match location? 
                # Actually, get_text("blocks") for images returns metadata in b[4] if it's text? No.
                
                # Let's try recovering the image from the PDF block
                # Blocks method treats image as bounding box items.
                # However, iterating images via `page.get_images` and matching rect is cleaner, 
                # but `blocks` is good for reading order.
                
                # For `get_text("dict")` structure is better:
                pass # Logic handled below slightly differently for "dict" approach if blocks fails for image content

    # RE-IMPLEMENTATION with `get_text("dict")` for better image handling
    # The "blocks" method doesn't easily yield the image data itself mixed with text reading order.
    # The "dict" output contains "blocks" which have "lines" which have "spans".
    # Images appear as image blocks.
    
    return extract_content_dict_mode(doc)

def extract_content_dict_mode(doc):
    if not os.path.exists(IMAGE_DIR):
        os.makedirs(IMAGE_DIR)
        
    questions = []
    current_q = {"text": "", "images": []}
    q_start_pattern = re.compile(r'^\s*(\d+)\.\s')
    img_counter = 0

    for page_num, page in enumerate(doc):
        blocks = page.get_text("dict")["blocks"]
        #blocks.sort(key=lambda b: (b["bbox"][1], b["bbox"][0])) # Usually already sorted by fitz

        for b in blocks:
            if b["type"] == 0: # Text
                block_text = ""
                for line in b["lines"]:
                    for span in line["spans"]:
                        block_text += span["text"] + " "
                    block_text += "\n"
                
                text_clean = block_text.strip()
                match = q_start_pattern.match(text_clean)
                
                if match:
                    # New Question
                    if current_q["text"].strip() or current_q["images"]:
                        questions.append(current_q)
                    current_q = {"text": text_clean, "images": []}
                else:
                    current_q["text"] += "\n" + text_clean

            elif b["type"] == 1: # Image
                # b["image"] contains the image bytes often, or we use b["ext"] format
                # Actually "image" key contains the binary data in standard fitz dict output
                image_bytes = b.get("image")
                ext = b.get("ext", "png")
                
                if image_bytes:
                    img_filename = f"{IMAGE_DIR}/img_{page_num}_{img_counter}.{ext}"
                    with open(img_filename, "wb") as f:
                        f.write(image_bytes)
                    
                    current_q["images"].append(img_filename)
                    img_counter += 1
    
    # Append last
    if current_q["text"].strip() or current_q["images"]:
        questions.append(current_q)
        
    print(f"Extracted {len(questions)} items (potential questions).")
    return questions

def categorize_questions(questions):
    categorized = {k: [] for k in CONCEPTS.keys()}
    categorized["Miscellaneous"] = []

    for q_obj in questions:
        q_text = q_obj["text"]
        q_lower = q_text.lower()
        
        # Skip empty garbage
        if not q_text.strip() and not q_obj["images"]:
            continue
            
        best_category = None
        max_matches = 0
        
        for category, keywords in CONCEPTS.items():
            count = sum(1 for k in keywords if k in q_lower)
            if count > max_matches:
                max_matches = count
                best_category = category
        
        target = best_category if (best_category and max_matches > 0) else "Miscellaneous"
        categorized[target].append(q_obj)
            
    return categorized

def generate_pdf(categorized_data, output_filename):
    doc = SimpleDocTemplate(output_filename, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    
    title_style = styles['Heading1']
    category_style = styles['Heading2']
    question_style = ParagraphStyle(
        'Question',
        parent=styles['Normal'],
        spaceAfter=12,
        leading=15
    )

    story.append(Paragraph("Sorted Python Question Bank", title_style))
    story.append(Spacer(1, 12))

    for category, items in categorized_data.items():
        if not items:
            continue
            
        story.append(Paragraph(category, category_style))
        story.append(Spacer(1, 6))
        
        for item in items:
            # Prepare flowables for this single question so we can KeepTogether
            q_flowables = []
            
            # Format text
            # Replace newlines with <br/> for HTML-like paragraph rendering
            clean_text = item["text"].replace("\n", "<br/>")
            # Highlight options a) b) etc
            clean_text = re.sub(r'(<br/>\s*[a-d]\))', r'<br/><b>\1</b>', clean_text)
            
            q_flowables.append(Paragraph(clean_text, question_style))
            
            # Add images
            for img_path in item["images"]:
                try:
                    # Create Image flowable
                    # Limit width to PAGE_WIDTH - margins (approx 450-500)
                    img = PlatypusImage(img_path)
                    
                    # Scaling logic
                    max_width = 400
                    img_width = img.drawWidth
                    img_height = img.drawHeight
                    
                    if img_width > max_width:
                        ratio = max_width / img_width
                        img.drawWidth = max_width
                        img.drawHeight = img_height * ratio
                        
                    q_flowables.append(Spacer(1, 5))
                    q_flowables.append(img)
                    q_flowables.append(Spacer(1, 5))
                except Exception as e:
                    print(f"Error adding image {img_path}: {e}")
            
            q_flowables.append(Spacer(1, 10))
            
            # Keep question text and its images together if possible
            story.append(KeepTogether(q_flowables))
            
    doc.build(story)
    print(f"PDF generated: {output_filename}")

def main():
    print("Extracting content with PyMuPDF...")
    questions = extract_content(INPUT_FILE)
    
    print("Categorizing...")
    sorted_data = categorize_questions(questions)
    
    for cat, qs in sorted_data.items():
        print(f"  {cat}: {len(qs)} questions")

    print("Generating PDF...")
    generate_pdf(sorted_data, OUTPUT_FILE)

if __name__ == "__main__":
    main()
