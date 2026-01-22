import fitz

doc = fitz.open("Git MCQ.pdf")
print(f"Total pages: {len(doc)}")
print("--- Last Page Text ---")
print(doc[-1].get_text())
