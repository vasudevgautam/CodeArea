const express = require("express");

const router = express.Router();

const Bookmark = require("../models/Bookmark");

const { protect } = require("../middleware/authMiddleware");


// =====================================
// GET MY BOOKMARKS
// =====================================

router.get(
    "/",
    protect,
    async (req, res) => {

        try {

            const userId =
                req.user._id ||
                req.user.id ||
                req.user.userId;


            const bookmarks =
                await Bookmark
                    .find({
                        userId
                    })
                    .populate(
                        "problemId",
                        "title slug difficulty category"
                    )
                    .sort({
                        createdAt: -1
                    });


            return res.json({

                success: true,

                bookmarks

            });

        } catch (error) {

            console.error(
                "Get bookmarks error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to load bookmarks"

            });

        }

    }
);


// =====================================
// CHECK BOOKMARK
// =====================================

router.get(
    "/check/:problemId",
    protect,
    async (req, res) => {

        try {

            const userId =
                req.user._id ||
                req.user.id ||
                req.user.userId;


            const bookmark =
                await Bookmark.findOne({

                    userId,

                    problemId:
                        req.params.problemId

                });


            return res.json({

                success: true,

                bookmarked: !!bookmark

            });

        } catch (error) {

            console.error(
                "Check bookmark error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to check bookmark"

            });

        }

    }
);


// =====================================
// ADD BOOKMARK
// =====================================

router.post(
    "/:problemId",
    protect,
    async (req, res) => {

        try {

            const userId =
                req.user._id ||
                req.user.id ||
                req.user.userId;


            const problemId =
                req.params.problemId;


            const existingBookmark =
                await Bookmark.findOne({

                    userId,

                    problemId

                });


            if (existingBookmark) {

                return res.json({

                    success: true,

                    bookmarked: true,

                    message:
                        "Problem already bookmarked"

                });

            }


            const bookmark =
                await Bookmark.create({

                    userId,

                    problemId

                });


            return res.status(201).json({

                success: true,

                bookmarked: true,

                bookmark

            });

        } catch (error) {

            console.error(
                "Add bookmark error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to bookmark problem"

            });

        }

    }
);


// =====================================
// REMOVE BOOKMARK
// =====================================

router.delete(
    "/:problemId",
    protect,
    async (req, res) => {

        try {

            const userId =
                req.user._id ||
                req.user.id ||
                req.user.userId;


            await Bookmark.deleteOne({

                userId,

                problemId:
                    req.params.problemId

            });


            return res.json({

                success: true,

                bookmarked: false,

                message:
                    "Bookmark removed"

            });

        } catch (error) {

            console.error(
                "Remove bookmark error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to remove bookmark"

            });

        }

    }
);


module.exports = router;