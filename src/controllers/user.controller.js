import pool from "../db.js";
import bcrypt from "bcrypt";
import { createUserSchema } from "../schemas/user.schema.js";

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE status = 'active'");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Get a user by email
const getUserByEmail = async (req, res) => {
    const {email} = req.params;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1 AND status = 'active'", [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" }); 
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Create a new user
const createUser = async (req, res) => {
    try {
        // Validate request body
        const validationDataUser = createUserSchema.safeParse(req.body);
        if (!validationDataUser.success) {
            console.error("Validation error:", validationDataUser.error.issues);
            return res.status(400).json({ error: validationDataUser.error.errors });
        }

        const { first_name, last_name, email, password, phone_number } = validationDataUser.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [first_name, last_name, email, hashedPassword, phone_number] 
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
}

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number } = req.body;
    try {
        const result = await pool.query(
            "UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4 WHERE user_id = $5 RETURNING *",
            [first_name, last_name, email, phone_number, id]
        );  
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
}

// Delete a user (soft delete)  
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "UPDATE users SET status = 'inactive' WHERE user_id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}   

export { getAllUsers, 
         getUserByEmail, 
         createUser,
         updateUser,
         deleteUser
    };