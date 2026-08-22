
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProblemDetails.css";

const API_URL = "http://localhost:5000/api";

function ProblemDetails() {
    const { slug } = useParams();

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================
    // LANGUAGE
    // =====================================

    const [language, setLanguage] = useState("cpp");

    const [codes, setCodes] = useState({
        cpp: "",
        java: "",
        python: ""
    });

    const code = codes[language] || "";

    // =====================================
    // EXECUTION STATES
    // =====================================

    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);


    // =====================================
    // GET STARTER CODE
    // =====================================

    const getStarterCode = (problemData, selectedLanguage) => {
        if (!problemData) {
            return "";
        }

        return problemData.starterCode?.[selectedLanguage] || "";
    };


    // =====================================
    // LOAD PROBLEM
    // =====================================

    useEffect(() => {
        fetchProblem();
    }, [slug]);


    const fetchProblem = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/problems/${slug}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Problem response:", response.data);

            if (response.data.success) {
                const loadedProblem = response.data.problem;

                setProblem(loadedProblem);

                setCodes({
                    cpp: getStarterCode(
                        loadedProblem,
                        "cpp"
                    ),

                    java: getStarterCode(
                        loadedProblem,
                        "java"
                    ),

                    python: getStarterCode(
                        loadedProblem,
                        "python"
                    )
                });

                setLanguage("cpp");

                setRunResult(null);
                setSubmitResult(null);

            } else {
                setError("Problem not found");
            }

        } catch (err) {
            console.error("Problem error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load problem"
            );

        } finally {
            setLoading(false);
        }
    };


    // =====================================
    // CHANGE LANGUAGE
    // =====================================

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;

        setLanguage(selectedLanguage);

        // Remove old execution results
        setRunResult(null);
        setSubmitResult(null);
    };


    // =====================================
    // CODE CHANGE
    // =====================================

    const handleCodeChange = (e) => {
        const newCode = e.target.value;

        setCodes((previousCodes) => ({
            ...previousCodes,
            [language]: newCode
        }));
    };


    // =====================================
    // RUN CODE
    // =====================================

    const handleRunCode = async () => {
        if (!problem || !code.trim()) {
            setRunResult({
                success: false,
                message: "Please enter some code before running."
            });

            return;
        }

        try {
            setRunning(true);
            setRunResult(null);
            setSubmitResult(null);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${API_URL}/run`,
                {
                    problemId: problem._id,
                    code,
                    language
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Run response:", response.data);

            setRunResult(response.data);

        } catch (err) {
            console.error("Run error:", err);

            setRunResult({
                success: false,
                message:
                    err.response?.data?.message ||
                    "Failed to run code"
            });

        } finally {
            setRunning(false);
        }
    };


    // =====================================
    // SUBMIT CODE
    // =====================================

    const handleSubmit = async () => {
        if (!problem || !code.trim()) {
            setSubmitResult({
                success: false,
                status: "Submission Failed",
                message: "Please enter some code before submitting."
            });

            return;
        }

        try {
            setSubmitting(true);
            setSubmitResult(null);
            setRunResult(null);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${API_URL}/submit`,
                {
                    problemId: problem._id,
                    code,
                    language
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(
                "Submit response:",
                response.data
            );

            setSubmitResult(response.data);

        } catch (err) {
            console.error(
                "Submit error:",
                err
            );

            setSubmitResult({
                success: false,
                status: "Submission Failed",
                message:
                    err.response?.data?.message ||
                    "Submission failed"
            });

        } finally {
            setSubmitting(false);
        }
    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {
        return (
            <div className="leetcode-page">
                <div className="center-message">
                    <div className="loading-spinner"></div>
                    <p>Loading problem...</p>
                </div>
            </div>
        );
    }


    // =====================================
    // ERROR
    // =====================================

    if (error || !problem) {
        return (
            <div className="leetcode-page">
                <div className="center-message">
                    <p>
                        {error || "Problem not found"}
                    </p>

                    <Link to="/problems">
                        ← Back to Problems
                    </Link>
                </div>
            </div>
        );
    }


    // =====================================
    // RENDER
    // =====================================

    return (
        <div className="leetcode-page">

            {/* =================================
                TOP BAR
            ================================= */}

            <div className="leetcode-topbar">

                <Link
                    to="/problems"
                    className="topbar-logo"
                >
                    CodeArea
                </Link>

                <div className="topbar-center">
                    <span>Problem</span>
                </div>

                <Link
                    to="/problems"
                    className="topbar-problems"
                >
                    Problems
                </Link>

            </div>


            {/* =================================
                MAIN
            ================================= */}

            <div className="leetcode-main">


                {/* =================================
                    LEFT PROBLEM PANEL
                ================================= */}

                <div className="leetcode-problem">

                    <div className="problem-heading">
                        <h1>
                            {problem.title}
                        </h1>
                    </div>


                    {/* META */}

                    <div className="problem-meta">

                        <span
                            className={`difficulty ${
                                problem.difficulty?.toLowerCase()
                            }`}
                        >
                            {problem.difficulty}
                        </span>

                        {problem.category && (
                            <span className="category">
                                {problem.category}
                            </span>
                        )}

                    </div>


                    {/* DESCRIPTION */}

                    <div className="problem-section">

                        <h2>Description</h2>

                        <p>
                            {problem.description}
                        </p>

                    </div>


                    {/* EXAMPLES */}

                    {problem.examples?.length > 0 && (
                        <div className="problem-section">

                            <h2>Examples</h2>

                            {problem.examples.map(
                                (example, index) => (
                                    <div
                                        className="leetcode-example"
                                        key={index}
                                    >

                                        <strong>
                                            Example {index + 1}
                                        </strong>

                                        {example.input && (
                                            <div>
                                                <b>Input:</b>{" "}
                                                {example.input}
                                            </div>
                                        )}

                                        {example.output && (
                                            <div>
                                                <b>Output:</b>{" "}
                                                {example.output}
                                            </div>
                                        )}

                                        {example.explanation && (
                                            <div>
                                                <b>
                                                    Explanation:
                                                </b>{" "}
                                                {example.explanation}
                                            </div>
                                        )}

                                    </div>
                                )
                            )}

                        </div>
                    )}


                    {/* CONSTRAINTS */}

                    {problem.constraints?.length > 0 && (
                        <div className="problem-section">

                            <h2>Constraints</h2>

                            <div className="constraints">

                                {problem.constraints.map(
                                    (constraint, index) => (
                                        <div
                                            key={index}
                                            className="constraint-item"
                                        >
                                            • {constraint}
                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                </div>


                {/* =================================
                    RIGHT CODE EDITOR
                ================================= */}

                <div className="leetcode-editor">


                    {/* EDITOR HEADER */}

                    <div className="editor-topbar">

                        <div className="editor-language">

                            <span className="editor-label">
                                Code
                            </span>

                            <select
                                value={language}
                                onChange={
                                    handleLanguageChange
                                }
                            >

                                <option value="cpp">
                                    C++
                                </option>

                                <option value="java">
                                    Java
                                </option>

                                <option value="python">
                                    Python
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* CODE AREA */}

                    <div className="code-area">

                        <div className="line-numbers">

                            {code
                                .split("\n")
                                .map((_, index) => (
                                    <div key={index}>
                                        {index + 1}
                                    </div>
                                ))}

                        </div>


                        <textarea
                            value={code}
                            onChange={handleCodeChange}
                            spellCheck="false"
                            className="leetcode-code"
                            placeholder={
                                `Write your ${
                                    language === "cpp"
                                        ? "C++"
                                        : language === "java"
                                            ? "Java"
                                            : "Python"
                                } solution here...`
                            }
                        />

                    </div>


                    {/* =================================
                        RESULTS
                    ================================= */}

                    {(runResult || submitResult) && (
                        <div className="result-container">

                            {runResult && (
                                <div className="result-block">

                                    <div
                                        className={`result-title ${
                                            runResult.success
                                                ? "accepted"
                                                : "rejected"
                                        }`}
                                    >
                                        Run Result
                                    </div>

                                    <pre>
                                        {
                                            runResult.output ||
                                            runResult.message ||
                                            JSON.stringify(
                                                runResult,
                                                null,
                                                2
                                            )
                                        }
                                    </pre>

                                </div>
                            )}


                            {submitResult && (
                                <div className="result-block">

                                    <div
                                        className={`result-title ${
                                            submitResult.success
                                                ? "accepted"
                                                : "rejected"
                                        }`}
                                    >
                                        {
                                            submitResult.status ||
                                            (
                                                submitResult.success
                                                    ? "Accepted"
                                                    : "Submission Failed"
                                            )
                                        }
                                    </div>

                                    <p>
                                        {
                                            submitResult.message ||
                                            ""
                                        }
                                    </p>

                                </div>
                            )}

                        </div>
                    )}


                    {/* =================================
                        BOTTOM BAR
                    ================================= */}

                    <div className="editor-bottom">

                        <Link
                            to={`/problems/${slug}/submissions`}
                            className="history-link"
                        >
                            Submission History
                        </Link>


                        <div className="editor-actions">

                            <button
                                className="run-btn"
                                onClick={handleRunCode}
                                disabled={
                                    running ||
                                    submitting
                                }
                            >
                                {running
                                    ? "Running..."
                                    : "Run Code"}
                            </button>


                            <button
                                className="submit-btn"
                                onClick={handleSubmit}
                                disabled={
                                    running ||
                                    submitting
                                }
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProblemDetails;

