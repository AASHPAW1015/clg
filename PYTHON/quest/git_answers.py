# Answers for Git MCQ.pdf
# Extracted 120 questions.

# 1-20
A1 = "B,B,B,B,B,B,A,B,B,B,B,B,A,B,B,B,B,B,B,B".split(",")

# 21-40
# 26: git restore -> B (Staged/unstaged lost changes)
# 33: stars -> A
A2 = "B,B,B,B,B,B,A,B,B,B,B,B,A,B,B,B,B,B,B,B".split(",")

# Correction for A2 based on my check:
# 21 B (Alert about repo activities)
# 22 B (git pull)
# 23 B (Job alerts)
# 24 B (commit msg)
# 25 B (Consistent)
# 26 B (Restore)
# 27 A (Projects -> Task mgmt) -> Wait. Q27 options: A.Task, B.Food, C.Music, D.Bank. Answer A.
# 28 B (Groups share resources)
# 29 B (Wiki)
# 30 B (Premium)
# 31 B (Repo contains branches/files)
# 32 B (show details)
# 33 A (stars -> appreciation)
# 34 B (diff)
# 35 B (banner)
# 36 B (connection)
# 37 B (branch -d)
# 38 B (SSH)
# 39 B (Streak)
# 40 B (Version control)
# So 27 is A. 33 is A. The rest B.

A2 = ["B", "B", "B", "B", "B", "B", "A", "B", "B", "B", "B", "B", "A", "B", "B", "B", "B", "B", "B", "B"]

# 41-60
# 41 B
# 42 B
# 43 A (Push -> sends commits)
# 44 B
# 45 B
# 46 B
# 47 B
# 48 B
# 49 B
# 50 B
# 51 A (Revert -> Undo)
# 52 B
# 53 B
# 54 B
# 55 B
# 56 B
# 57 B
# 58 B
# 59 B
# 60 B
A3 = ["B", "B", "A", "B", "B", "B", "B", "B", "B", "B", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B"]

# 61-80
# 61 B
# 62 B
# 63 C (Repo -> Code files. Options A.Movies B.Wallpapers C.Code D.Music) -> C
# 64 B
# 65 B
# 66 B
# 67 B
# 68 B
# 69 A (Working dir -> Files being edited/current. Options A.Edited B.Deleted...) -> A
# 70 B
# 71 B
# 72 B
# 73 B (Reset -> Hard delete/rollback. Options A.Reboot B.Rollback...) -> B
# 74 A (Follow -> Celebs)
# 75 B
# 76 B
# 77 B
# 78 B
# 79 A (mv -> Move/Rename)
# 80 B
A4 = ["B", "B", "C", "B", "B", "B", "B", "B", "A", "B", "B", "B", "B", "A", "B", "B", "B", "B", "A", "B"]

# 81-100
# 81 B
# 82 A (Clone -> Duplicate locally)
# 83 B
# 84 B
# 85 B (Index)
# 86 B
# 87 B
# 88 B
# 89 B
# 90 B
# 91 B
# 92 B
# 93 B
# 94 B
# 95 B
# 96 B
# 97 B
# 98 B
# 99 B
# 100 B
A5 = ["B", "A", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"]

# 101-120
# 101 B
# 102 B
# 103 B
# 104 B
# 105 C (About -> Summary. Q105 Options: A.Height B.Horoscope C.Summary D.Tattoos) -> C
# 106 A (Star)
# 107 B
# 108 B
# 109 B
# 110 B
# 111 B
# 112 B
# 113 B
# 114 A (Clean -> Untracked)
# 115 A (Trending -> Popular)
# 116 A (Poll -> Votes)
# 117 A (Archive -> Tar/Zip)
# 118 A (Protection -> Force pushes)
# 119 A (Stash pop -> Apply & Remove)
# 120 A (Cherry pick -> Apply specific)
A6 = ["B", "B", "B", "B", "C", "A", "B", "B", "B", "B", "B", "B", "B", "A", "A", "A", "A", "A", "A", "A"]


GIT_ANSWERS_LIST = A1 + A2 + A3 + A4 + A5 + A6

GIT_ANSWERS = {i+1: ans for i, ans in enumerate(GIT_ANSWERS_LIST)}
