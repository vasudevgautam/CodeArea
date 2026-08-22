const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");
const Submission = require("../models/Submission");


// =====================================
// DASHBOARD STATISTICS
// =====================================

router.get("/stats", async (req, res) => {

    try {

        const totalProblems =
            await Problem.countDocuments();


        const totalSubmissions =
            await Submission.countDocuments();


        const acceptedSubmissions =
            await Submission.countDocuments({
                status: "Accepted"
            });


        return res.json({

            success: true,

            stats: {

                totalProblems,

                totalSubmissions,

                acceptedSubmissions

            }

        });

    } catch (error) {

        console.error(
            "Dashboard stats error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to load dashboard statistics"

        });

    }

});


// =====================================
// RECENT SUBMISSIONS
// =====================================

router.get("/recent", async (req, res) => {

    try {

        const submissions =
            await Submission
                .find()
                .sort({
                    createdAt: -1
                })
                .limit(10)
                .populate(
                    "problemId",
                    "title slug difficulty"
                );


        return res.json({

            success: true,

            submissions

        });

    } catch (error) {

        console.error(
            "Recent submissions error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to load recent submissions"

        });

    }

});


module.exports = router;