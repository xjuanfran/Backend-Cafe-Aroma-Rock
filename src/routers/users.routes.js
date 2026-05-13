import { Router } from "express";
import { getAllUsers,getUserByEmail, createUser} from "../controllers/user.controller.js";

const router = Router();

// Get all users
router.get("/api/user", getAllUsers);

// Get a user by email
router.get("/api/user/:email", getUserByEmail);

// Create a new user  
router.post("/api/createUser", createUser);

// Update a user
//router.patch("/user/:id", updateUser);

// Delete a user
//router.patch("/user/delete/:id", deleteUser);

export default router;
