import pool from "../db.js";

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

export { getAllUsers, 
         getUserByEmail 
        //createUser,
        //updateUser,
        //deleteUser
    };