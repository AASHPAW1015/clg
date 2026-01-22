import fitz

doc = fitz.open("Git MCQ.pdf")
print(doc[0].get_text())
