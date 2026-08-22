import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-intro">
                    <span className="footer-brand">CodeArea</span>
                    <p>Practice. Solve. Improve.</p>
                </div>

                <div className="footer-column">
                    <Link to="/about" className="footer-heading">
                        About CodeArea
                    </Link>
                    <ul>
                        <li>Practice Coding</li>
                        <li>Improve Your Skills</li>
                        <li>Track Your Progress</li>
                        <li>Bookmark Problems</li>
                        <li>Submit &amp; Learn</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <span className="footer-heading">Quick Links</span>
                    <div className="footer-links">
                        <Link to="/problems">Problems</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/bookmarks">Bookmarks</Link>
                    </div>
                </div>

                <div className="footer-column">
                    <span className="footer-heading">Connect</span>
                    <div className="footer-links">
                        <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                        >GitHub</a>
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                        >LinkedIn</a>
                        <Link to="/help">Contact</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>&copy; 2026 CodeArea. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
