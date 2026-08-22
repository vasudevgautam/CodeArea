const jwt = require("jsonwebtoken");


// =====================================
// PROTECT ROUTES
// =====================================

const protect = (req, res, next) => {

    try {

        // Get Authorization header
        const authHeader =
            req.headers.authorization;


        // No Authorization header
        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "No token provided"

            });

        }


        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,

                message: "Invalid authorization format"

            });

        }


        // Get token
        const token =
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Token missing"

            });

        }


        // Verify JWT
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Save decoded user
        req.user = decoded;


        // Continue
        next();


    } catch (error) {

        console.error(
            "Auth error:",
            error.message
        );


        return res.status(401).json({

            success: false,

            message: "Invalid or expired token"

        });

    }

};


module.exports = {

    protect

};