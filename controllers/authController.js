const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userSchema.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(201).json({ token, user: newUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token, user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

exports.getUser = async (req, res) => {
    const user = userSchema.findById(req.params.id);
    res.status(200).json({
        name: user.name,
        email: user.email,
    });
}