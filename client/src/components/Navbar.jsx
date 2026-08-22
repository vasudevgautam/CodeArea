import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "dark"
    );
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const isActive = (path) =>
        path === "/dashboard"
            ? location.pathname === path
            : location.pathname.startsWith(path);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/dashboard" className="navbar-logo">
                    <span className="logo-symbol">&lt;/&gt;</span>
                    <span className="logo-text">CodeArea</span>
                </Link>

                <div className="navbar-links">
                    <Link
                        to="/dashboard"
                        className={`navbar-link ${
                            isActive("/dashboard") ? "active" : ""
                        }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/problems"
                        className={`navbar-link ${
                            isActive("/problems") ? "active" : ""
                        }`}
                    >
                        Problems
                    </Link>
                    <Link
                        to="/bookmarks"
                        className={`navbar-link ${
                            isActive("/bookmarks") ? "active" : ""
                        }`}
                    >
                        Bookmarks
                    </Link>
                </div>
            </div>

            <div className="navbar-right">
                <button
                    className="theme-toggle"
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    aria-label={
                        theme === "dark"
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                >
                    {theme === "dark" ? "Light" : "Dark"}
                </button>

                <div className="profile-menu">
                    <button
                        className="profile-menu-button"
                        onClick={() => setProfileOpen(!profileOpen)}
                        aria-expanded={profileOpen}
                        aria-label="Open profile menu"
                    >
                        <span className="profile-menu-avatar">U</span>
                        <span className="profile-menu-label">Profile</span>
                    </button>

                    {profileOpen && (
                        <div className="profile-dropdown">
                            <Link
                                to="/profile"
                                onClick={() => setProfileOpen(false)}
                            >
                                My Profile
                            </Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
