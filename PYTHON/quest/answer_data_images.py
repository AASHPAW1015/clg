
# Manually transcribed from images
# We will append these as new questions.

IMAGE_QUESTIONS = [
    {
        "text": "What will be the output? def add(a, b): return a + b; result = add(3, 4); print(result)",
        "answer": "7"
    },
    {
        "text": "What will be the output? with open(\"x.txt\",\"w\") as f: f.write(\"Hi\"); print(f.closed)",
        "answer": "True"
    },
    {
        "text": "What will be the output? print(bool(\"\"))",
        "answer": "False"
    },
    {
        "text": "What will be the output? a = [1, 2, 3]; b = a; b.append(4); print(len(a))",
        "answer": "4 (b refers to same list a)"
    },
    {
        "text": "What will be the output? a = 5; print(a == 5 or a > 10)",
        "answer": "True"
    },
    {
        "text": "What will be the output? print(5 in [1, 2, 3])",
        "answer": "False"
    },
    {
        "text": "What will be the output? import random; print(type(random.random()))",
        "answer": "<class 'float'>"
    },
    {
        "text": "What will be the output? print(list(filter(lambda x: x>2, [1, 2, 3, 4])))",
        "answer": "[3, 4]"
    },
    {
        "text": "What will be the output? print(bool(0), bool(1))",
        "answer": "False True"
    },
    {
        "text": "What will be the output? for i in range(5, 2, -1): print(i, end=\" \")",
        "answer": "5 4 3"
    },
    {
        "text": "What will be the output? a = {1, 2, 3}; a.add(4); print(len(a))",
        "answer": "4"
    }
]
