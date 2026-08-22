const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        }
    },
    {
        timestamps: true
    }
);


// Prevent duplicate bookmarks
BookmarkSchema.index(
    {
        userId: 1,
        problemId: 1
    },
    {
        unique: true
    }
);


module.exports =
    mongoose.model(
        "Bookmark",
        BookmarkSchema
    );