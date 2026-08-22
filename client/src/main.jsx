import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import "./Theme.css";

import { AuthProvider } from "./context/AuthContext";

document.documentElement.dataset.theme =
    localStorage.getItem("theme") || "dark";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
