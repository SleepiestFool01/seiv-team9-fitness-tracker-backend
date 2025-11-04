import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import catalogController from "../controllers/catalog.controller.js";

const router = Router();

// Create a new catalog entry (assign lesson to user)
router.post("/", [authenticate], catalogController.create);

// Retrieve all catalog entries
router.get("/", [authenticate], catalogController.findAll);

// Retrieve all lessons for a specific user
router.get("/user/:id_user", [authenticate], catalogController.findAllForUser);

// Retrieve a specific catalog entry
router.get("/:id_user/:id_lesson", [authenticate], catalogController.findOne);

// Delete a catalog entry
router.delete("/:id_user/:id_lesson", [authenticate], catalogController.delete);

export default router;
