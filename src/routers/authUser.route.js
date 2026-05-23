import { Router } from "express";
import { loginUser } from "../controllers/authUser.controller.js";

const router = Router();

// Route for user login             
router.post("/api/login", loginUser);

// Route for user logout
// router.post("/api/logout", logoutUser);

export default router;
