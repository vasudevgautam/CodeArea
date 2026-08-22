import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Problems.css";

const API_URL = "http://localhost:5000/api";

function Problems() {

    const [problems, setProblems] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================
    // FETCH PROBLEMS
    // =====================================

    const fetchProblems = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    `${API_URL}/problems?limit=100`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            console.log(
                "Problems response:",
                response.data
            );


            if (response.data.success) {

                setProblems(
                    response.data.problems || []
                );

            } else {

                setProblems([]);

            }

        } catch (err) {

            console.error(
                "Fetch problems error:",
                err
            );

            setError(
                "Failed to load problems"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // FETCH BOOKMARKS
    // =====================================

    const fetchBookmarks = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    `${API_URL}/bookmarks`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            if (response.data.success) {

                const ids =
                    (response.data.bookmarks || [])
                        .map(
                            (bookmark) =>
                                bookmark.problemId?._id ||
                                bookmark.problemId
                        );

                setBookmarks(ids);

            }

        } catch (err) {

            console.error(
                "Fetch bookmarks error:",
                err
            );

        }

    };


    // =====================================
    // INITIAL LOAD
    // =====================================

    useEffect(() => {

        fetchProblems();
        fetchBookmarks();

    }, []);


    // =====================================
    // TOGGLE BOOKMARK
    // =====================================

    const toggleBookmark = async (
        problemId
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            const isBookmarked =
                bookmarks.includes(problemId);


            if (isBookmarked) {

                await axios.delete(
                    `${API_URL}/bookmarks/${problemId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                setBookmarks(
                    bookmarks.filter(
                        (id) =>
                            id !== problemId
                    )
                );

            } else {

                await axios.post(
                    `${API_URL}/bookmarks/${problemId}`,
                    {},
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                setBookmarks([
                    ...bookmarks,
                    problemId
                ]);

            }

        } catch (err) {

            console.error(
                "Bookmark error:",
                err
            );

        }

    };


    // =====================================
    // FILTER PROBLEMS
    // =====================================

    const filteredProblems =
        problems.filter((problem) => {

            const matchesSearch =
                problem.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesDifficulty =
                difficulty === "All" ||
                problem.difficulty ===
                    difficulty;

            return (
                matchesSearch &&
                matchesDifficulty
            );

        });


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="problems-page">

                <div className="problems-loading">

                    Loading problems...

                </div>

            </div>
        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error) {

        return (
            <div className="problems-page">

                <div className="problems-error">

                    {error}

                    <button
                        onClick={fetchProblems}
                    >
                        Retry
                    </button>

                </div>

            </div>
        );

    }


    // =====================================
    // UI
    // =====================================

    return (

        <div className="problems-page">

            <div className="problems-header">

                <div>

                    <h1>
                        Problems
                    </h1>

                    <p>
                        Practice coding problems
                        and improve your skills.
                    </p>

                </div>

            </div>


            {/* FILTERS */}

            <div className="problem-filters">

                <input
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />


                <select
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(
                            e.target.value
                        )
                    }
                >

                    <option value="All">
                        All Difficulties
                    </option>

                    <option value="Easy">
                        Easy
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="Hard">
                        Hard
                    </option>

                </select>

            </div>


            {/* PROBLEM COUNT */}

            <div className="problem-count">

                {filteredProblems.length}
                {" "}
                problem
                {filteredProblems.length !== 1
                    ? "s"
                    : ""}

            </div>


            {/* EMPTY */}

            {filteredProblems.length === 0 ? (

                <div className="no-problems">

                    No problems found.

                </div>

            ) : (

                <div className="problems-list">

                    {filteredProblems.map(
                        (problem) => {

                            const problemId =
                                problem._id;

                            const isBookmarked =
                                bookmarks.includes(
                                    problemId
                                );

                            const isSolved =
                                problem.solved === true;


                            return (

                                <div
                                    className="problem-card"
                                    key={problemId}
                                >

                                    <div className="problem-main">

                                        <Link
                                            to={`/problem/${problem.slug || problemId}`}
                                            className="problem-title"
                                        >

                                            {problem.title}

                                        </Link>


                                        <div className="problem-meta">

                                            {isSolved && (

                                                <span
                                                    className="solved-badge"
                                                    title="Solved"
                                                >
                                                    &#10003; Solved
                                                </span>

                                            )}

                                            <span
                                                className={`difficulty ${problem.difficulty?.toLowerCase()}`}
                                            >
                                                {problem.difficulty}
                                            </span>


                                            {problem.category && (

                                                <span className="category">

                                                    {problem.category}

                                                </span>

                                            )}

                                        </div>

                                    </div>


                                    <button
                                        className={`bookmark-button ${
                                            isBookmarked
                                                ? "bookmarked"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            toggleBookmark(
                                                problemId
                                            )
                                        }
                                        title={
                                            isBookmarked
                                                ? "Remove bookmark"
                                                : "Bookmark problem"
                                        }
                                    >

                                        {isBookmarked
                                            ? "★"
                                            : "☆"}

                                    </button>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}


export default Problems;
