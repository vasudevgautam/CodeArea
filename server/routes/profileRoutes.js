const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Submission = require("../models/Submission");

const { protect } =
    require("../middleware/authMiddleware");


// =====================================
// GET USER PROFILE
// =====================================

router.get("/", protect, async (req, res) => {

    try {

        // Get logged-in user ID
        const userId =
            req.user._id ||
            req.user.id ||
            req.user.userId;


        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "User ID not found in token"
            });

        }


        // Find user
        const user =
            await User.findById(userId)
                .select("-password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // Get user's submissions
        const submissions =
            await Submission.find({
                userId: userId
            }).populate(
                "problemId",
                "title difficulty"
            );


        // =====================================
        // STATISTICS
        // =====================================

        const totalSubmissions =
            submissions.length;


        const acceptedSubmissions =
            submissions.filter(
                submission =>
                    submission.status === "Accepted"
            ).length;


        // Sets prevent counting the same problem
        // multiple times
        const easySolved = new Set();
        const mediumSolved = new Set();
        const hardSolved = new Set();


        submissions.forEach(submission => {

            // Only accepted submissions count
            if (submission.status !== "Accepted") {
                return;
            }


            // Problem was not populated
            if (!submission.problemId) {
                return;
            }


            const problemId =
                submission.problemId._id.toString();


            const difficulty =
                submission.problemId.difficulty;


            if (difficulty === "Easy") {

                easySolved.add(problemId);

            }

            else if (difficulty === "Medium") {

                mediumSolved.add(problemId);

            }

            else if (difficulty === "Hard") {

                hardSolved.add(problemId);

            }

        });


        const easy =
            easySolved.size;

        const medium =
            mediumSolved.size;

        const hard =
            hardSolved.size;


        const totalSolved =
            easy + medium + hard;


        const acceptanceRate =
            totalSubmissions > 0
                ? Math.round(
                    (
                        acceptedSubmissions /
                        totalSubmissions
                    ) * 100
                )
                : 0;


        // =====================================
        // RESPONSE
        // =====================================

        return res.json({

            success: true,

            user: {

                id: user._id,

                name:
                    user.name ||
                    user.username ||
                    "CodeArea User",

                username:
                    user.username || "",

                email:
                    user.email || "",

                createdAt:
                    user.createdAt

            },

            statistics: {

                totalSolved,

                easy,

                medium,

                hard,

                totalSubmissions,

                acceptedSubmissions,

                acceptanceRate

            }

        });


    } catch (error) {

        console.error(
            "Profile error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Failed to load profile",

            error: error.message

        });

    }

});


module.exports = router;