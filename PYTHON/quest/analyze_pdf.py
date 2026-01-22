
import PyPDF2

def analyze_pdf(filename):
    try:
        reader = PyPDF2.PdfReader(filename)
        print(f"Number of pages: {len(reader.pages)}")
        print("\n--- SAMPLE CONTENT (Page 1) ---")
        print(reader.pages[0].extract_text())
        if len(reader.pages) > 1:
            print("\n--- SAMPLE CONTENT (Page 2) ---")
            print(reader.pages[1].extract_text())
    except Exception as e:
        print(f"Error reading PDF: {e}")

if __name__ == "__main__":
    analyze_pdf("Final - QuestionBankForPython.pdf")
