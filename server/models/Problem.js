const mongoose = require("mongoose");


// =====================================
// TEST CASE SCHEMA
// =====================================

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


// =====================================
// JUDGE PARAMETER SCHEMA
// =====================================

const judgeParameterSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);


// =====================================
// JUDGE SCHEMA
// =====================================

const judgeSchema = new mongoose.Schema(
    {
        functionName: {
            type: String,
            required: true
        },

        returnType: {
            type: String,
            required: true
        },

        parameters: {
            type: [judgeParameterSchema],
            default: []
        }
    },
    {
        _id: false
    }
);


// =====================================
// PROBLEM SCHEMA
// =====================================

const problemSchema = new mongoose.Schema(
    {
        // =====================================
        // BASIC INFORMATION
        // =====================================

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
            enum: [
                "Easy",
                "Medium",
                "Hard"
            ],
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


        // =====================================
        // EXAMPLES
        // =====================================

        examples: [
            {
                input: {
                    type: String
                },

                output: {
                    type: String
                },

                explanation: {
                    type: String
                }
            }
        ],


        // =====================================
        // TEST CASES
        // =====================================

        testCases: {
            type: [testCaseSchema],
            default: []
        },


        // =====================================
        // STARTER CODE
        // =====================================

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


        // =====================================
        // JUDGE CONFIGURATION
        // =====================================

        judge: {
            type: judgeSchema,
            required: false,
            default: null
        },


        // =====================================
        // STATISTICS
        // =====================================

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


// =====================================
// EXPORT MODEL
// =====================================

module.exports =
    mongoose.model(
        "Problem",
        problemSchema
    );
