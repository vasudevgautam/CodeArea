import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
function ProtectedRoute({ children }) {

    const token =
        localStorage.getItem("token");


    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return (

        <>
            <Navbar />

            <div className="app-shell">
                <Sidebar />
                <div className="app-shell-content">
                    {children}
                </div>
            </div>

            <Footer />

        </>

    );

}

export default ProtectedRoute;
