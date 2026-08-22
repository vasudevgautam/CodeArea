const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const Submission = require("../models/Submission");


// =====================================
// GET SUBMISSION HISTORY
// =====================================

router.get("/:problemId", async (req, res) => {

    try {

        const submissions =
            await Submission
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

            message:
                "Failed to get submissions"

        });

    }

});


module.exports = router;