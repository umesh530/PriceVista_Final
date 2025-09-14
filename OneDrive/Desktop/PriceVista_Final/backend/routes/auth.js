const express = require('express');
const router = express.Router();
const { getConnection } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const connection = await getConnection();

        // Check if user already exists
        const checkSql = `SELECT * FROM users WHERE username = :username OR email = :email`;
        const result = await connection.execute(checkSql, { username, email });

        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const insertSql = `INSERT INTO users (username, email, password) VALUES (:username, :email, :password)`;
        await connection.execute(insertSql, { username, email, password: hashedPassword }, { autoCommit: true });

        res.status(201).json({ message: 'User registered successfully!' });
        await connection.close();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await getConnection();

        // Find user by username
        const query = `SELECT * FROM users WHERE username = :username`;
        const result = await connection.execute(query, { username });

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const user = result.rows[0];
        const userId = user[0];
        const dbPassword = user[3];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, dbPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Create JWT token
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
        await connection.close();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
