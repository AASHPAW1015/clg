
# Auto-generated scratch answers
B1 = "B,B,B,B,C,C,B,B,C,A,A,C,B,B,C,B,B,B,A,B".split(",")
B2 = "B,B,B,B,B,B,B,B,C,B,B,B,A,B,B,B,B,B,A,A".split(",")
B3 = "B,C,B,B,B,B,B,C,C,B,C,C,B,B,A,A,B,B,A,A".split(",")
B4 = "D,B,B,C,B,A,A,B,B,B,C,D,A,B,A,A,C,A,D,A".split(",")
B5 = "C,B,A,C,C,B,B,A,B,C,C,B,A,B,B,B,B,A,C,B".split(",")
B6 = "B,B,B,B,C,B,D,B,B,B,B,A,A,B,B,A,B,B,A,B".split(",")
B7 = "D,A,B,B,C,B,A,A,B,B,B,C,D,C,C,A,B,A,B,B".split(",") # Q128 joining->A, Q132 erase->D, Q139 Visual->B. Wait I edited B7 text above differently.
# Let's align B7 again.
# 120 D, 121 A, 122 B, 123 B, 124 C, 125 B, 126 A, 127 A, 128 B(Red), 129 B(Save), 130 B, 131 C, 132 D(Erase), 133 C, 134 C, 135 C, 136 A, 137 B, 138 A, 139 B.
B7_FINAL = "D,A,B,B,C,B,A,A,B,B,B,C,D,C,C,C,A,B,A,B".split(",")

B8 = "B,B,A,B,C,C,C,C,C,C,B,C,B,A,C,A,B,C,B,D".split(",")
B9 = "C,C,B,C,B,C,A,A,C,A,C,A,B,A,B,C,B,B,B,B".split(",")
B10 = "C,C,B,C,A,B,A,B,B,C,C,B,C,C,C,B,C,C,A,B".split(",")
B11 = "B,C,B,B,C,D,A,D,C,A,B,B,C,A,A,B,A,C,C,B".split(",")
B12 = "A,B,A,D,A,B,A,B,A,C,B,A,B,D,B,B,B,B,A,B".split(",")

# Combine
SCRATCH_ANSWERS_LIST = B1 + B2 + B3 + B4 + B5 + B6 + B7_FINAL + B8 + B9 + B10 + B11 + B12

# Convert to Dict {Index+1: Answer} (Start 1)
# Wait, questions numbers from PDF extract are 1-20, 1-20.
# I should store simple list and access by index 0..239.
# Or dict 1..240? 
# The PDF generator will iterate 0..N.
