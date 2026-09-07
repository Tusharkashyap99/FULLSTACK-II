const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5001;
const JWT_SECRET = "my_super_secret_key";

// Mock User
const user = {
    id: 1,
    username: "tushar",
    password: "12345",
    name: "Tushar Kashyap"
};

// =============================
// LOGIN ROUTE
// =============================

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username !== user.username || password !== user.password) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

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

    res.json({
        message: "Login successful",
        token: token
    });
});

// =============================
// JWT MIDDLEWARE
// =============================

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access token required"
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token"
            });
        }

        req.user = user;
        next();
    });
}

// =============================
// PROTECTED PROFILE ROUTE
// =============================

app.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

// =============================
// TEST ROUTE
// =============================

app.get("/", (req, res) => {
    res.send("JWT Authentication Backend is Running!");
});

// =============================
// START SERVER
// =============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});