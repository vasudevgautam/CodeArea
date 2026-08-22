
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import SubmissionHistory from "./pages/SubmissionHistory";
import About from "./pages/About";
import Help from "./pages/Help";
import ResourcePage from "./pages/ResourcePage";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    DASHBOARD
                ========================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    PROBLEMS LIST
                ========================= */}

                <Route
                    path="/problems"
                    element={
                        <ProtectedRoute>
                            <Problems />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    SINGLE PROBLEM
                ========================= */}

                <Route
                    path="/problem/:slug"
                    element={
                        <ProtectedRoute>
                            <ProblemDetails />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    SUBMISSION HISTORY
                ========================= */}

                <Route
                    path="/problem/:slug/submissions"
                    element={
                        <ProtectedRoute>
                            <SubmissionHistory />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    PROFILE
                ========================= */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    BOOKMARKS
                ========================= */}

                <Route
                    path="/bookmarks"
                    element={
                        <ProtectedRoute>
                            <Bookmarks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/help"
                    element={
                        <ProtectedRoute>
                            <Help />
                        </ProtectedRoute>
                    }
                />

                <Route path="/library" element={<ProtectedRoute><ResourcePage type="library" /></ProtectedRoute>} />
                <Route path="/explore" element={<ProtectedRoute><ResourcePage type="explore" /></ProtectedRoute>} />
                <Route path="/study-plan" element={<ProtectedRoute><ResourcePage type="study-plan" /></ProtectedRoute>} />
                <Route path="/query" element={<ProtectedRoute><ResourcePage type="query" /></ProtectedRoute>} />


                {/* =========================
                    DEFAULT ROUTE
                ========================= */}

                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;
