import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {

    const [stats, setStats] = useState({
        totalProblems: 0,
        totalSubmissions: 0,
        acceptedSubmissions: 0
    });

    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================
    // LOAD DASHBOARD
    // =====================================

    useEffect(() => {

        fetchDashboard();

    }, []);


    const fetchDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("token");


            const config = {

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            };


            // =====================================
            // STATS
            // =====================================

            const statsResponse =
                await axios.get(
                    `${API_URL}/dashboard/stats`,
                    config
                );


            if (
                statsResponse.data.success
            ) {

                setStats(
                    statsResponse.data.stats
                );

            }


            // =====================================
            // RECENT SUBMISSIONS
            // =====================================

            const recentResponse =
                await axios.get(
                    `${API_URL}/dashboard/recent`,
                    config
                );


            if (
                recentResponse.data.success
            ) {

                setSubmissions(
                    recentResponse.data.submissions ||
                    []
                );

            }

        } catch (err) {

            console.error(
                "Dashboard error:",
                err
            );

            setError(
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="dashboard-page">

                <div className="dashboard-loading">

                    Loading dashboard...

                </div>

            </div>

        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error) {

        return (

            <div className="dashboard-page">

                <div className="dashboard-error">

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={
                            fetchDashboard
                        }
                    >
                        Retry
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="dashboard-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Track your coding
                        progress.
                    </p>

                </div>

            </div>


            {/* =================================
                STAT CARDS
            ================================= */}

            <div className="dashboard-stats">


                {/* TOTAL PROBLEMS */}

                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-number">

                        {stats.totalProblems || 0}

                    </span>

                    <span className="dashboard-stat-label">

                        Total Problems

                    </span>

                </div>


                {/* TOTAL SUBMISSIONS */}

                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-number">

                        {stats.totalSubmissions || 0}

                    </span>

                    <span className="dashboard-stat-label">

                        Total Submissions

                    </span>

                </div>


                {/* ACCEPTED */}

                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-number">

                        {stats.acceptedSubmissions || 0}

                    </span>

                    <span className="dashboard-stat-label">

                        Accepted

                    </span>

                </div>


            </div>


            {/* =================================
                QUICK ACTIONS
            ================================= */}

            <div className="dashboard-actions">

                <Link
                    to="/problems"
                    className="dashboard-action"
                >
                    Solve Problems
                </Link>


                <Link
                    to="/bookmarks"
                    className="dashboard-action"
                >
                    My Bookmarks
                </Link>


                <Link
                    to="/profile"
                    className="dashboard-action"
                >
                    My Profile
                </Link>

            </div>


            {/* =================================
                RECENT SUBMISSIONS
            ================================= */}

            <div className="recent-submissions">

                <div className="recent-header">

                    <h2>
                        Recent Submissions
                    </h2>

                </div>


                {submissions.length === 0 ? (

                    <div className="no-submissions">

                        No submissions yet.

                        <Link
                            to="/problems"
                        >
                            Start solving problems
                        </Link>

                    </div>

                ) : (

                    <div className="submission-list">

                        {submissions.map(
                            (submission) => {

                                const problem =
                                    submission.problemId;


                                const problemSlug =
                                    problem?.slug ||
                                    problem?._id;


                                return (

                                    <div
                                        className="submission-card"
                                        key={
                                            submission._id
                                        }
                                    >


                                        {/* PROBLEM */}

                                        <div className="submission-problem">

                                            {problemSlug ? (

                                                <Link
                                                    to={`/problem/${problemSlug}`}
                                                    className="submission-title"
                                                >

                                                    {
                                                        problem?.title ||
                                                        "Problem"
                                                    }

                                                </Link>

                                            ) : (

                                                <span>
                                                    Problem
                                                </span>

                                            )}

                                        </div>


                                        {/* DIFFICULTY */}

                                        <div className="submission-difficulty">

                                            {
                                                problem?.difficulty ||
                                                "-"
                                            }

                                        </div>


                                        {/* STATUS */}

                                        <div
                                            className={
                                                `submission-status ${
                                                    submission.status
                                                        ?.toLowerCase()
                                                        .replace(
                                                            /\s+/g,
                                                            "-"
                                                        )
                                                }`
                                            }
                                        >

                                            {
                                                submission.status ||
                                                "Unknown"
                                            }

                                        </div>


                                        {/* LANGUAGE */}

                                        <div className="submission-language">

                                            {
                                                submission.language ||
                                                "C++"
                                            }

                                        </div>


                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>


        </div>

    );

}


export default Dashboard;