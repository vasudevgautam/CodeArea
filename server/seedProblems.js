require("dotenv").config();
const mongoose = require("mongoose");
const Problem = require("./models/Problem");

const cpp = (body) => `#include <iostream>
using namespace std;

int main() {
${body}
    return 0;
}`;

const problems = [
    {
        title: "Sum of Two Numbers",
        slug: "sum-of-two-numbers",
        difficulty: "Easy",
        category: "Mathematics",
        tags: ["math", "implementation"],
        description: "Given two integers, print their sum.",
        constraints: ["-10^9 <= a, b <= 10^9"],
        examples: [{ input: "2 7", output: "9", explanation: "2 + 7 = 9." }],
        testCases: [
            { input: "2 7", output: "9", hidden: false },
            { input: "-10 4", output: "-6", hidden: true },
            { input: "0 0", output: "0", hidden: true }
        ],
        starterCode: { cpp: cpp("    long long a, b;\n    cin >> a >> b;\n    cout << a + b;") }
    },
    {
        title: "Even or Odd",
        slug: "even-or-odd",
        difficulty: "Easy",
        category: "Mathematics",
        tags: ["math", "modulo"],
        description: "Given an integer n, print Even if it is divisible by 2; otherwise print Odd.",
        constraints: ["-10^9 <= n <= 10^9"],
        examples: [{ input: "7", output: "Odd", explanation: "7 is not divisible by 2." }],
        testCases: [
            { input: "7", output: "Odd", hidden: false },
            { input: "24", output: "Even", hidden: true },
            { input: "0", output: "Even", hidden: true }
        ],
        starterCode: { cpp: cpp("    long long n;\n    cin >> n;\n    cout << (n % 2 == 0 ? \"Even\" : \"Odd\");") }
    },
    {
        title: "Reverse a String",
        slug: "reverse-a-string",
        difficulty: "Easy",
        category: "Strings",
        tags: ["string", "two pointers"],
        description: "Given a single word, print the characters in reverse order.",
        constraints: ["The word contains lowercase English letters.", "1 <= word length <= 1000"],
        examples: [{ input: "hello", output: "olleh", explanation: "The characters are printed from last to first." }],
        testCases: [
            { input: "hello", output: "olleh", hidden: false },
            { input: "code", output: "edoc", hidden: true },
            { input: "a", output: "a", hidden: true }
        ],
        starterCode: { cpp: cpp("    string word;\n    cin >> word;\n    // Reverse word and print it.") }
    },
    {
        title: "Factorial of a Number",
        slug: "factorial-of-a-number",
        difficulty: "Easy",
        category: "Mathematics",
        tags: ["math", "loops"],
        description: "Given a non-negative integer n, print n factorial. The factorial of 0 is 1.",
        constraints: ["0 <= n <= 20"],
        examples: [{ input: "5", output: "120", explanation: "5! = 5 x 4 x 3 x 2 x 1 = 120." }],
        testCases: [
            { input: "5", output: "120", hidden: false },
            { input: "0", output: "1", hidden: true },
            { input: "10", output: "3628800", hidden: true }
        ],
        starterCode: { cpp: cpp("    int n;\n    cin >> n;\n    // Calculate n! and print it.") }
    },
    {
        title: "Maximum of Three Numbers",
        slug: "maximum-of-three-numbers",
        difficulty: "Easy",
        category: "Algorithms",
        tags: ["comparison", "implementation"],
        description: "Given three integers a, b, and c, print the largest value.",
        constraints: ["-10^9 <= a, b, c <= 10^9"],
        examples: [{ input: "3 8 5", output: "8", explanation: "8 is greater than 3 and 5." }],
        testCases: [
            { input: "3 8 5", output: "8", hidden: false },
            { input: "-2 -7 -1", output: "-1", hidden: true },
            { input: "4 4 4", output: "4", hidden: true }
        ],
        starterCode: { cpp: cpp("    long long a, b, c;\n    cin >> a >> b >> c;\n    // Print the largest number.") }
    }
];

async function seedProblems() {
    await mongoose.connect(process.env.MONGO_URI);

    for (const problem of problems) {
        await Problem.updateOne(
            { slug: problem.slug },
            { $set: problem },
            { upsert: true }
        );
    }

    console.log(`Seeded ${problems.length} CodeArea problems.`);
    await mongoose.disconnect();
}

seedProblems().catch(async (error) => {
    console.error("Problem seeding failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
});
