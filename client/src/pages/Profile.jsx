import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL;

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({
        totalSubmissions: 0,
        acceptedSubmissions: 0,
        solvedProblems: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================
    // LOAD PROFILE
    // =====================================

    useEffect(() => {

        fetchProfile();

    }, []);


    const fetchProfile = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;

            }


            const profileResponse =
                await axios.get(
                    `${API_URL}/profile`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            if (
                profileResponse.data.success
            ) {

                setUser(
                    profileResponse.data.user
                );
                const data =
                    profileResponse.data.statistics || {};

                setStats({
                    totalSubmissions: data.totalSubmissions || 0,
                    acceptedSubmissions: data.acceptedSubmissions || 0,
                    solvedProblems: data.totalSolved || 0
                });
            }


        } catch (err) {

            console.error(
                "Profile error:",
                err
            );


            setError(
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="profile-page">

                <div className="profile-loading">

                    Loading profile...

                </div>

            </div>

        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error) {

        return (

            <div className="profile-page">

                <div className="profile-error">

                    {error}

                    <button
                        onClick={fetchProfile}
                    >
                        Retry
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="profile-page">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="profile-header">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Dashboard
                </button>

                <h1>
                    Profile
                </h1>

            </div>


            {/* =====================================
                PROFILE CARD
            ===================================== */}

            <div className="profile-card">

                <div className="profile-avatar">

                    {(
                        user?.name ||
                        user?.username ||
                        "U"
                    )
                        .charAt(0)
                        .toUpperCase()}

                </div>


                <div className="profile-info">

                    <h2>
                        {
                            user?.name ||
                            user?.username ||
                            "User"
                        }
                    </h2>


                    <p>
                        {
                            user?.email ||
                            "No email available"
                        }
                    </p>

                </div>

            </div>


            {/* =====================================
                STATISTICS
            ===================================== */}

            <div className="profile-stats">


                <div className="profile-stat">

                    <span className="stat-number">
                        {stats.totalSubmissions}
                    </span>

                    <span className="stat-label">
                        Total Submissions
                    </span>

                </div>


                <div className="profile-stat">

                    <span className="stat-number">
                        {stats.acceptedSubmissions}
                    </span>

                    <span className="stat-label">
                        Accepted
                    </span>

                </div>


                <div className="profile-stat">

                    <span className="stat-number">
                        {stats.solvedProblems}
                    </span>

                    <span className="stat-label">
                        Problems Solved
                    </span>

                </div>


            </div>


            {/* =====================================
                ACCOUNT INFORMATION
            ===================================== */}

            <div className="profile-section">

                <h2>
                    Account Information
                </h2>


                <div className="profile-row">

                    <span>
                        Name
                    </span>

                    <strong>
                        {
                            user?.name ||
                            user?.username ||
                            "-"
                        }
                    </strong>

                </div>


                <div className="profile-row">

                    <span>
                        Email
                    </span>

                    <strong>
                        {
                            user?.email ||
                            "-"
                        }
                    </strong>

                </div>


                <div className="profile-row">

                    <span>
                        Account ID
                    </span>

                    <strong>
                        {
                            user?.id ||
                            "-"
                        }
                    </strong>

                </div>

            </div>


            {/* =====================================
                LOGOUT
            ===================================== */}

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>


        </div>

    );

}


export default Profile;
