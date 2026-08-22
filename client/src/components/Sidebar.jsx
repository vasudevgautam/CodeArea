import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const navigation = [
    ["/dashboard", "Dashboard", "D"],
    ["/problems", "Problems", "P"],
    ["/library", "Library", "L"],
    ["/explore", "Explore", "E"],
    ["/study-plan", "Study Plan", "S"],
    ["/query", "Question Query", "Q"],
    ["/bookmarks", "Bookmarks", "B"]
];

function Sidebar() {
    const location = useLocation();

    return (
        <aside className="app-sidebar">
            <span className="sidebar-label">Workspace</span>
            <nav className="sidebar-nav" aria-label="Main navigation">
                {navigation.map(([path, label, icon]) => (
                    <Link
                        key={path}
                        to={path}
                        className={`sidebar-link ${
                            location.pathname.startsWith(path)
                                ? "active"
                                : ""
                        }`}
                    >
                        <span className="sidebar-icon">{icon}</span>
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
