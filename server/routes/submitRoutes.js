const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const { protect } = require("../middleware/authMiddleware");

const {
    runCppCode
} = require("../utils/codeRunner");

// =====================================
// GET SUBMISSION HISTORY
// =====================================

router.get("/:problemId", async (req, res) => {

    try {

        const submissions = await Submission
            .find({
                problemId: req.params.problemId
            })
            .sort({
                createdAt: -1
            });

        return res.json({

            success: true,

            count: submissions.length,

            submissions

        });

    } catch (error) {

        console.error(
            "Get submissions error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to get submissions"

        });

    }

});
// =====================================
// SUBMIT SOLUTION
// =====================================

router.post("/", protect, async (req, res) => {

    try {

        const {
            problemId,
            code,
            language
        } = req.body;

        const userId = req.user.userId;


        // =====================================
        // VALIDATION
        // =====================================

        if (!problemId) {

            return res.status(400).json({
                success: false,
                message: "Problem ID is required"
            });

        }


        if (!code) {

            return res.status(400).json({
                success: false,
                message: "Code is required"
            });

        }


        if (language !== "cpp") {

            return res.status(400).json({
                success: false,
                message: "Currently only C++ is supported"
            });

        }


        // =====================================
        // FIND PROBLEM
        // =====================================

        const problem =
            await Problem.findById(problemId);


        if (!problem) {

            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });

        }
console.log("PROBLEM ID:", problemId);

console.log("JUDGE:", problem.judge);

        // =====================================
        // CHECK TEST CASES
        // =====================================

        if (
            !problem.testCases ||
            problem.testCases.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message: "No test cases available"
            });

        }


        let passed = 0;

        let failedTestCase = null;

        let compilationError = null;

        let runtimeError = null;


        // =====================================
        // RUN ALL TEST CASES
        // =====================================

        for (
            let i = 0;
            i < problem.testCases.length;
            i++
        ) {

            const testCase =
                problem.testCases[i];


            console.log(
                `Running test case ${i + 1}/${problem.testCases.length}`
            );


       const result =
    await runCppCode(
        code,
        testCase.input,
        problem
    );


            // =====================================
            // ERROR
            // =====================================

            if (!result.success) {

                if (
                    result.status ===
                    "Compilation Error"
                ) {

                    compilationError =
                        result.output;

                } else {

                    runtimeError =
                        result.output;

                }

                break;
            }


            // =====================================
            // COMPARE OUTPUT
            // =====================================

            const actualOutput =
                result.output.trim();

            const expectedOutput =
                testCase.output.trim();


            if (
                actualOutput ===
                expectedOutput
            ) {

                passed++;

            } else {

                failedTestCase = {

                    testCase:
                        i + 1,

                    input:
                        testCase.input,

                    output:
                        actualOutput,

                    expected:
                        expectedOutput

                };

                break;
            }
        }


        // =====================================
        // COMPILATION ERROR
        // =====================================

        if (compilationError) {

            await Submission.create({

                problemId: problemId,

                userId,

                language: language,

                code: code,

                status: "Compilation Error",

                passed: passed,

                total:
                    problem.testCases.length,

                output:
                    compilationError

            });


            return res.json({

                success: false,

                status: "Compilation Error",

                passed: passed,

                total:
                    problem.testCases.length,

                output:
                    compilationError

            });

        }


        // =====================================
        // RUNTIME ERROR
        // =====================================

        if (runtimeError) {

            await Submission.create({

                problemId: problemId,

                userId,

                language: language,

                code: code,

                status: "Runtime Error",

                passed: passed,

                total:
                    problem.testCases.length,

                output:
                    runtimeError

            });


            return res.json({

                success: false,

                status: "Runtime Error",

                passed: passed,

                total:
                    problem.testCases.length,

                output:
                    runtimeError

            });

        }


        // =====================================
        // WRONG ANSWER
        // =====================================

        if (failedTestCase) {

            await Submission.create({

                problemId: problemId,

                userId,

                language: language,

                code: code,

                status: "Wrong Answer",

                passed: passed,

                total:
                    problem.testCases.length,

                output:
                    failedTestCase.output

            });


            return res.json({

                success: false,

                status: "Wrong Answer",

                passed: passed,

                total:
                    problem.testCases.length,

                testCase:
                    failedTestCase.testCase,

                input:
                    failedTestCase.input,

                output:
                    failedTestCase.output,

                expected:
                    failedTestCase.expected

            });

        }


        // =====================================
        // ACCEPTED
        // =====================================

        await Submission.create({

            problemId: problemId,

            userId,

            language: language,

            code: code,

            status: "Accepted",

            passed: passed,

            total:
                problem.testCases.length,

            output:
                "All test cases passed"

        });


        return res.json({

            success: true,

            status: "Accepted",

            passed: passed,

            total:
                problem.testCases.length,

            message:
                "All test cases passed!"

        });


    } catch (error) {

        console.error(
            "Submit error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Submission failed",

            error:
                error.message

        });

    }

});


module.exports = router;
