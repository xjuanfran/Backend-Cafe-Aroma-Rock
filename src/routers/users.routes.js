import { Router } from "express";
import { getAllUsers,getUserByEmail, createUser, updateUser, deleteUser} from "../controllers/user.controller.js";

const router = Router();

//Route for getting all users
router.get("/api/user", getAllUsers);

// Route for getting a user by email
router.get("/api/user/:email", getUserByEmail);

// Route for creating a new user
router.post("/api/createUser", createUser);

 // Route for updating a user
router.patch("/api/updateUser/:id", updateUser);

// Route for soft deleting a user
router.patch("/api/deleteUser/:id", deleteUser);

export default router;
