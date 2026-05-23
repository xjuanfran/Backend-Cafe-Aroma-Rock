import { email } from "zod";
import pool from "../db.js";
import bcrypt from "bcrypt";
import {authUserSchema} from "../schemas/authUser.schema.js";

export const loginUser = async (req, res) => {
    try {
        const {email, password} = authUserSchema.parse(req.body);
        const result = await pool.query("SELECT user_id, email, password FROM users WHERE email = $1 AND status = 'active'", [email]);
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
        res.json({message: "Login successful", publicUser});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({error: "Internal Server Error"});
    }   
};

