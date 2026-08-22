import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookmarks.css";
const API_URL = import.meta.env.VITE_API_URL;

function Bookmarks() {

    const navigate = useNavigate();

    const [bookmarks, setBookmarks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================
    // LOAD BOOKMARKS
    // =====================================

    const loadBookmarks = async () => {

        try {

            setLoading(true);

            setError("");


            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;

            }


            const response =
                await fetch(
                    `${API_URL}/bookmarks`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load bookmarks"
                );

            }


            setBookmarks(
                data.bookmarks || []
            );


        } catch (error) {

            console.error(
                "Bookmarks error:",
                error
            );


            setError(
                error.message ||
                "Failed to load bookmarks"
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // REMOVE BOOKMARK
    // =====================================

    const removeBookmark = async (
        problemId
    ) => {

        try {

            const token =
                localStorage.getItem("token");


            const response =
                await fetch(
                   `${API_URL}/bookmarks/${problemId}`,
                    {
                        method: "DELETE",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to remove bookmark"
                );

            }


            setBookmarks(
                previous =>
                    previous.filter(
                        bookmark =>
                            bookmark.problemId?._id !==
                            problemId
                    )
            );


        } catch (error) {

            console.error(
                "Remove bookmark error:",
                error
            );


            alert(
                error.message ||
                "Failed to remove bookmark"
            );

        }

    };


    // =====================================
    // LOAD ON PAGE OPEN
    // =====================================

    useEffect(() => {

        loadBookmarks();

    }, []);


    // =====================================
    // OPEN PROBLEM
    // =====================================

    const openProblem = (
        problem
    ) => {

      navigate(`/problem/${problem.slug}`);

    };


    // =====================================
    // RENDER
    // =====================================

    return (

        <div className="bookmarks-page">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="bookmarks-header">

                <div>

                    <h1>
                        Saved Problems
                    </h1>

                    <p>
                        Problems you saved
                        for later.
                    </p>

                </div>


               

            </div>


            {/* =====================================
                LOADING
            ===================================== */}

            {loading && (

                <div className="bookmarks-loading">

                    Loading saved problems...

                </div>

            )}


            {/* =====================================
                ERROR
            ===================================== */}

            {!loading && error && (

                <div className="bookmarks-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={loadBookmarks}
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* =====================================
                EMPTY STATE
            ===================================== */}

            {!loading &&
                !error &&
                bookmarks.length === 0 && (

                <div className="bookmarks-empty">

                    <div className="empty-star">
                        ☆
                    </div>

                    <h2>
                        No saved problems
                    </h2>

                    <p>
                        Bookmark problems from
                        the Problems page and
                        they will appear here.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/problems")
                        }
                    >
                        Browse Problems
                    </button>

                </div>

            )}


            {/* =====================================
                BOOKMARK LIST
            ===================================== */}

            {!loading &&
                !error &&
                bookmarks.length > 0 && (

                <div className="bookmarks-list">

                    {bookmarks.map(
                        (bookmark) => {

                            const problem =
                                bookmark.problemId;


                            if (!problem) {
                                return null;
                            }


                            return (

                                <div
                                    key={
                                        bookmark._id
                                    }
                                    className="saved-problem-card"
                                    onClick={() =>
                                        openProblem(
                                            problem
                                        )
                                    }
                                >


                                    {/* MAIN */}

                                    <div className="saved-problem-main">

                                        <div className="saved-title-row">

                                            <h2>
                                                {
                                                    problem.title
                                                }
                                            </h2>

                                            <span className="saved-star">
                                                ★
                                            </span>

                                        </div>


                                        <div className="saved-problem-meta">

                                            <span
                                                className={
                                                    `saved-difficulty ${
                                                        problem.difficulty
                                                            ?.toLowerCase()
                                                    }`
                                                }
                                            >
                                                {
                                                    problem.difficulty
                                                }
                                            </span>


                                            <span className="saved-category">

                                                {
                                                    problem.category
                                                }

                                            </span>

                                        </div>

                                    </div>


                                    {/* REMOVE */}

                                    <button
                                        className="remove-bookmark-button"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            removeBookmark(
                                                problem._id
                                            );

                                        }}
                                    >
                                        Remove
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


export default Bookmarks;