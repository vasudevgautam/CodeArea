const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());


// =====================================
// ROUTES
// =====================================

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const runRoutes = require("./routes/runRoutes");
const submitRoutes = require("./routes/submitRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes =
    require("./routes/profileRoutes");
    const bookmarkRoutes =
    require("./routes/bookmarkRoutes");

// Authentication
app.use(
    "/api/auth",
    authRoutes
);


// Problems
app.use(
    "/api/problems",
    problemRoutes
);


// Run code
app.use(
    "/api",
    runRoutes
);


// Submit solution
app.use("/api/submit", submitRoutes);


// Submission history
app.use(
    "/api/submissions",
    submissionRoutes
);
app.use("/api/dashboard", dashboardRoutes);
app.use(
    "/api/profile",
    profileRoutes
);
app.use(
    "/api/bookmarks",
    bookmarkRoutes
);

// =====================================
// TEST ROUTE
// =====================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "CodeArea server is running"
    });

});


// =====================================
// MONGODB
// =====================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected:",
            mongoose.connection.host
        );

    })
    .catch((error) => {

        console.error(
            "MongoDB connection error:",
            error
        );

    });


// =====================================
// SERVER
// =====================================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});