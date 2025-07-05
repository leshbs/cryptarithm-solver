from itertools import permutations

def crypt():
    allow_leading_zero = input("Apakah anda mengizinkan leading zero? (ya/tidak): ").strip().lower()
    allow_leading_zero = allow_leading_zero == 'ya'

    line1 = input("Tolong tuliskan penjumlah 1: ").strip()
    line2 = input("Tolong tuliskan penjumlah 2: ").strip()
    print("------------------------------------------- +")
    line3 = input("Tolong tuliskan hasil: ").strip()
    print("\n==========================\n")

    # Get unique letters from all inputs
    letters = list(set(line1 + line2 + line3))
    if len(letters) > 10:
        print("Jangan terlalu banyak letter (maksimum 10).")
        return

    # First characters of each word to check leading zero restriction
    first_letters = {line1[0], line2[0], line3[0]}

    for perm in permutations(range(10), len(letters)):
        combo = dict(zip(letters, perm))

        if not allow_leading_zero and any(combo[char] == 0 for char in first_letters):
            continue

        def word_to_int(word):
            return int(''.join(str(combo[ch]) for ch in word))

        num1 = word_to_int(line1)
        num2 = word_to_int(line2)
        num3 = word_to_int(line3)

        if num1 + num2 == num3:
            print(combo)
            print(num1)
            print(num2)
            print("------------- +")
            print(num3)
            print(" ")

crypt()
