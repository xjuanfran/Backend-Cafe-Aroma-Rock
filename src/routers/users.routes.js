import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

// Get all users
router.get("/user", getAllUsers);

// Get a user by ID
router.get("/user/:id", getUserById);

// Create a new user  
//router.post("/user", createUser);

// Update a user
//router.patch("/user/:id", updateUser);

// Delete a user
//router.patch("/user/delete/:id", deleteUser);

export default router;


