const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const { protect } = require("../middleware/authMiddleware");


// =====================================
// GET ALL PROBLEMS
// =====================================

router.get("/", protect, async (req, res) => {

    try {

        const {
            search,
            difficulty,
            category,
            page = 1,
            limit = 5
        } = req.query;


        // =====================================
        // BUILD FILTER
        // =====================================

        const filter = {};


        if (search && search.trim() !== "") {

            filter.title = {
                $regex: search.trim(),
                $options: "i"
            };

        }


        if (
            difficulty &&
            difficulty !== "All"
        ) {

            filter.difficulty = difficulty;

        }


        if (
            category &&
            category !== "All"
        ) {

            filter.category = category;

        }


        // =====================================
        // PAGINATION
        // =====================================

        const currentPage =
            Math.max(
                parseInt(page) || 1,
                1
            );


        const perPage =
            Math.max(
                parseInt(limit) || 5,
                1
            );


        const skip =
            (currentPage - 1) * perPage;


        // Total matching problems
        const totalProblems =
            await Problem.countDocuments(filter);


        // Get current page
        const problems =
            await Problem.find(filter)
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(perPage);

        const solvedProblemIds = new Set(
            (await Submission.distinct("problemId", {
                userId: req.user.userId,
                status: "Accepted"
            })).map((id) => id.toString())
        );

        const problemsWithSolvedStatus = problems.map((problem) => ({
            ...problem.toObject(),
            solved: solvedProblemIds.has(problem._id.toString())
        }));


        const totalPages =
            Math.ceil(
                totalProblems / perPage
            );


        return res.json({

            success: true,

            count: problems.length,

            totalProblems,

            currentPage,

            totalPages,

            limit: perPage,

            problems: problemsWithSolvedStatus

        });


    } catch (error) {

        console.error(
            "Get problems error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Failed to get problems",

            error: error.message

        });

    }

});


// =====================================
// GET SINGLE PROBLEM BY SLUG
// =====================================

router.get("/:slug", async (req, res) => {

    try {

        const problem = await Problem.findOne({
            slug: req.params.slug
        });

        if (!problem) {

            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });

        }

        return res.json({
            success: true,
            problem
        });

    } catch (error) {

        console.error(
            "Get problem error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch problem"
        });

    }

});


module.exports = router;
