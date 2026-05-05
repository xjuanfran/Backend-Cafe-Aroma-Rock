import { Router } from "express";

const router = Router();

// Get all users
router.get("/", (req, res) => {
  res.json({ message: "Obtener todos los usuarios" });
});
