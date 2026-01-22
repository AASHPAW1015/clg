import fitz
import re
import os
import json

INPUT_FILE = "Final - QuestionBankForPython.pdf"
IMAGE_DIR = "extracted_images"
OUTPUT_MAP = "image_map.json"

def map_images():
    doc = fitz.open(INPUT_FILE)
    
    # Store results: Question Text Snippet -> Image Path
    # Or cleaner: Page Number -> List of (Question Number, Image Path)
    
    image_map = []
    
    img_global_counter = 0 # To match my previous extraction if needed, but here we can just verify paths
    
    # regex for "Que <number>:"
    que_pattern = re.compile(r'Que\s*(\d+):')
    
    for page_num, page in enumerate(doc):
        # Get blocks details
        blocks = page.get_text("blocks")
        # Sort: top to bottom, then left to right
        blocks.sort(key=lambda b: (b[1], b[0]))
        
        current_que_num = None
        
        for b in blocks:
            # b = (x0, y0, x1, y1, text/content, block_no, block_type)
            # block_type 0 = text, 1 = image
            
            if b[6] == 0: # Text
                text = b[4].strip()
                # Check for "Que X:"
                m = que_pattern.search(text)
                if m:
                    current_que_num = int(m.group(1))
                    
            elif b[6] == 1: # Image
                # Found an image. Link to current_que_num if it exists
                # We need to find the filename. 
                # Since we extracted images earlier using PyMuPDF "dict" method likely, 
                # or we can reconstruct the filename logic I used in `process_questions.py`
                # In `process_questions.py`, I used: f"{IMAGE_DIR}/img_{page_num}_{img_counter}.{ext}"
                # I need to match that counter.
                
                # Re-do dict extraction logic to ensure filename matches?
                # Actually, `process_questions.py` used `get_text("dict")` which visits blocks in order.
                # `get_text("blocks")` visits blocks in order too. 
                # So if I just maintain a counter per page (or global? check process_questions), I can match.
                pass 

    # To be safe, let's just use the `process_questions.py` logic again but specifically for mapping
    # I'll query `process_questions.py`'s extraction logic 
    # Logic was: img_filename = f"{IMAGE_DIR}/img_{page_num}_{img_counter}.{ext}"
    # img_counter was page-based? No, it was `img_counter = 0` outside loop.
    # Wait, in `process_questions.py`:
    # img_counter = 0
    # for page_num, page in enumerate(doc):
    #    ...
    #        img_filename = f"{IMAGE_DIR}/img_{page_num}_{img_counter}.{ext}"
    #        img_counter += 1 (This accumulates across pages? No, `img_{page_num}_{img_counter}` implies reset?)
    # Let me check `process_questions.py` logic.

    # Checking `process_questions.py` content from memory/view:
    # img_counter = 0 (Global)
    # inside loop: ... img_filename = f"img_{page_num}_{img_counter}" ... img_counter += 1
    # This means img_counter increments globally.
    
    # Lets re-run the extraction loop just to map
    pass

def precise_mapping():
    doc = fitz.open(INPUT_FILE)
    img_counter = 0
    mapping = []
    
    que_start_pattern = re.compile(r'Que\s*(\d+):')

    for page_num, page in enumerate(doc):
        # We need to replicate the exact iteration order of `process_questions.py`'s "dict" mode
        blocks = page.get_text("dict")["blocks"]
        # fitz sorts these usually
        
        current_que = "Unknown"
        
        for b in blocks:
            if b["type"] == 0: # Text
                # Extract text
                block_text = ""
                for line in b["lines"]:
                    for span in line["spans"]:
                        block_text += span["text"] + " "
                
                # Check for label
                m = que_start_pattern.search(block_text)
                if m:
                    current_que = f"Que {m.group(1)}"
            
            elif b["type"] == 1: # Image
                ext = b.get("ext", "png")
                # Filename consistent with previous dump
                fname = f"img_{page_num}_{img_counter}.{ext}"
                
                # Store
                mapping.append({
                    "question": current_que,
                    "image_path": f"{IMAGE_DIR}/{fname}",
                    "page": page_num
                })
                
                img_counter += 1 # Global increment
                
    with open(OUTPUT_MAP, "w") as f:
        json.dump(mapping, f, indent=2)
    print(f"Mapped {len(mapping)} images.")

if __name__ == "__main__":
    precise_mapping()
