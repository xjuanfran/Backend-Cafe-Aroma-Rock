import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {authUserSchema} from "../schemas/authUser.schema.js";

const loginUser = async (req, res) => {
    const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
    const {email, password} = authUserSchema.parse(req.body);
    
    try {
        const result = await pool.query("SELECT user_id, email, password FROM users WHERE email = $1 AND status = 'active'", [email]);
        // Generate JWT token with user email and set expiration time
        const token = jwt.sign({email}, SECRET_JWT_KEY, {expiresIn: "4h"});
        const {rows} = result;

        if (rows.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        // Assuming email is unique, we can safely take the first row
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }
        // Exclude password from the response
        const {password: _, ...publicUser} = user;
        res.cookie("accessToken", token, { 
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).send({message: "Login successful", user: publicUser});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }   
};

const logoutUser = (req, res) => {
    res.clearCookie("accessToken")
    .json({message: "Logout successful"});
};

export {
    loginUser, 
    logoutUser
};
