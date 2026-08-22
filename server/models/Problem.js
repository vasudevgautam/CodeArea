const mongoose = require("mongoose");
const testCaseSchema = new mongoose.Schema(
    {
        input: {
            type: String,
            required: true
        },

        output: {
            type: String,
            required: true
        },

        explanation: {
            type: String,
            default: ""
        },

        hidden: {
            type: Boolean,
            default: false
        }
    },
    {
        _id: false
    }
);

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true
        },

        category: {
            type: String,
            default: "Algorithms"
        },

        tags: [
            {
                type: String
            }
        ],

        constraints: [
            {
                type: String
            }
        ],

        examples: [
            {
                input: String,
                output: String,
                explanation: String
            }
        ],

        testCases: [testCaseSchema],

        starterCode: {
            cpp: {
                type: String,
                default: ""
            },

            java: {
                type: String,
                default: ""
            },

            python: {
                type: String,
                default: ""
            }
        },

        acceptedCount: {
            type: Number,
            default: 0
        },

        submissionCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Problem", problemSchema);