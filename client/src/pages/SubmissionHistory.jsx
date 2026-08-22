import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./SubmissionHistory.css";

const API_URL = import.meta.env.VITE_API_URL;

function SubmissionHistory() {

    const { slug } = useParams();

    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        fetchSubmissions();

    }, [slug]);


    const fetchSubmissions = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");


            // First get the problem using slug

            const problemResponse =
                await axios.get(
                    `${API_URL}/problems/${slug}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const problem =
                problemResponse.data.problem;


            if (!problem) {

                setError(
                    "Problem not found"
                );

                return;

            }


            // Get submission history

            const response =
                await axios.get(
                    `${API_URL}/submissions/${problem._id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            if (response.data.success) {

                setSubmissions(
                    response.data.submissions || []
                );

            }

        } catch (err) {

            console.error(
                "Submission history error:",
                err
            );

            setError(
                "Failed to load submission history"
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="submission-history-page">

                <div className="history-loading">

                    Loading submissions...

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="submission-history-page">

                <div className="history-error">

                    <p>{error}</p>

                    <Link to={`/problem/${slug}`}>
                        ← Back to Problem
                    </Link>

                </div>

            </div>

        );

    }


    return (

        <div className="submission-history-page">

            <div className="history-header">

                <Link
                    to={`/problem/${slug}`}
                    className="back-problem"
                >
                    ← Back to Problem
                </Link>

                <h1>
                    Submission History
                </h1>

                <p>
                    All your submissions for this problem
                </p>

            </div>


            {submissions.length === 0 ? (

                <div className="no-history">

                    <h2>
                        No submissions yet
                    </h2>

                    <p>
                        Submit your solution to see
                        your submission history here.
                    </p>

                    <Link
                        to={`/problem/${slug}`}
                        className="solve-button"
                    >
                        Go to Code Editor
                    </Link>

                </div>

            ) : (

                <div className="history-list">

                    {submissions.map(
                        (submission, index) => (

                        <div
                            className="history-card"
                            key={
                                submission._id ||
                                index
                            }
                        >

                            <div>

                                <strong>
                                    Submission #
                                    {submissions.length - index}
                                </strong>

                                <p>
                                    Language:{" "}
                                    {
                                        submission.language ||
                                        "C++"
                                    }
                                </p>

                            </div>


                            <div
                                className={
                                    `history-status ${
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


                            <div className="history-date">

                                {
                                    submission.createdAt
                                        ? new Date(
                                            submission.createdAt
                                        ).toLocaleString()
                                        : "-"
                                }

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default SubmissionHistory;