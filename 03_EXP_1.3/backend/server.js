const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5001;

// JWT Secret Key
const JWT_SECRET = "my_super_secret_key";

// Mock User
const user = {
    id: 1,
    username: "tushar",
    password: "12345",
    name: "Tushar Kashyap"
};

// ===============================
// LOGIN ROUTE
// ===============================

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check username and password
    if (username !== user.username || password !== user.password) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            name: user.name
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    // Send token to frontend
    res.json({
        message: "Login successful",
        token: token
    });
});

// ===============================
// JWT AUTHENTICATION MIDDLEWARE
// ===============================

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    // Extract token from "Bearer TOKEN"
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access token required"
        });
    }

    // Verify JWT
    jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token"
            });
        }

        // Store decoded user information
        req.user = decodedUser;

        next();
    });
}

// ===============================
// PROTECTED PROFILE ROUTE
// ===============================

app.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("JWT Authentication Backend is Running!");
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});