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

export { getAllUsers };