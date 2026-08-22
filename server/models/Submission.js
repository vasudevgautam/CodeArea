const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
    {
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        language: {
            type: String,
            required: true,
            default: "cpp"
        },

        code: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true
        },

        passed: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            default: 0
        },

        output: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Submission",
    SubmissionSchema
);