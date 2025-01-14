import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';


export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "name , email and password are required" });
        }

        // email validation function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // email check
        if (!isValidEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        // checking existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "Email already exists" })
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        await user.save()

        // creating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        // sending cookie wit token to browser
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        // sending welcome email




        return res.json({ success: true, message: 'Account created' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "email and password are required" });
        }

        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }


        // creating token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        // sending cookie wit token to browser
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        res.json({ success: true, message: 'login successfull' })



    } catch (error) {

    }
}

export const logout = async (req, res) => {

    try {

        res.clearCookie('token', {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({ success: true, message: 'logged out' })



    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

export const isSignedIn = async (req, res) => {
    try {

        return res.json({ success: true, message: 'logged in' })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const generateResetOtp = async (req, res) => {

}


export const verifyResetOtp = async (req, res) => {

}

export const resetPassword = async (req, res) => {

}