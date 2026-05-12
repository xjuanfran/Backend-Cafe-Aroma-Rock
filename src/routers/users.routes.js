import { Router } from "express";
import { getAllUsers,getUserByEmail} from "../controllers/user.controller.js";

const router = Router();

// Get all users
router.get("/user", getAllUsers);

// Get a user by email
router.get("/user/:email", getUserByEmail);

// Create a new user  
//router.post("/user", createUser);

// Update a user
//router.patch("/user/:id", updateUser);

// Delete a user
//router.patch("/user/delete/:id", deleteUser);

export default router;
