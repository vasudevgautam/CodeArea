const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");

const {
    runCppCode
} = require("../utils/codeRunner");


router.post("/run", async (req, res) => {

    try {

        const {
            problemId,
            code,
            language
        } = req.body;


        // =========================
        // VALIDATION
        // =========================

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


        // =========================
        // FIND PROBLEM
        // =========================

        const problem = await Problem.findById(problemId);


        if (!problem) {

            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });

        }


        // =========================
        // GET FIRST TEST CASE
        // =========================

        const testCase = problem.testCases[0];


        if (!testCase) {

            return res.status(400).json({
                success: false,
                message: "No test cases available"
            });

        }


        console.log(
            "Running problem:",
            problem.title
        );

        console.log(
            "Input:",
            testCase.input
        );


        // =========================
        // RUN C++ CODE
        // =========================

        const result = await runCppCode(
            code,
            testCase.input


        // =========================
        // COMPILATION / RUNTIME ERROR
        // =========================

        if (!result.success) {

            return res.json({

                success: false,

                status: result.status,

                output: result.output,

                expected: testCase.output

            });

        }


        // =========================
        // COMPARE OUTPUT
        // =========================

        const actualOutput =
            result.output.trim();

        const expectedOutput =
            testCase.output.trim();


        const isCorrect =
            actualOutput === expectedOutput;


        // =========================
        // SEND RESULT
        // =========================

        return res.json({

            success: true,

            status: isCorrect
                ? "Accepted"
                : "Wrong Answer",

            output: actualOutput,

            expected: expectedOutput

        });


    } catch (error) {

        console.error(
            "Run route error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Failed to run code",

            error: error.message

        });

    }

});


module.exports = router;