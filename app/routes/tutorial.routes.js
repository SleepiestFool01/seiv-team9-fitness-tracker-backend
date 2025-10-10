import tutorials from "../controllers/tutorial.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

const router = Router();

// Create a new Tutorial
router.post("/", [authenticate], tutorials.create);

// Retrieve all Tutorials
router.get("/", [authenticate], tutorials.findAll);

// Retrieve all Tutorials for user (legacy alias: /userTut/:userId)
router.get("/user/:userId", [authenticate], tutorials.findAllForUser);
router.get("/userTut/:userId", [authenticate], tutorials.findAllForUser);

// Retrieve a single Tutorial with id
router.get("/:id", [authenticate], tutorials.findOne);

// Update a Tutorial with id
router.put("/:id", [authenticate], tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", [authenticate], tutorials.delete);

export default router;
