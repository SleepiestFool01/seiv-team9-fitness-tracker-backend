import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import muscleGroupController from "../controllers/muscle_group.controller.js";

const router = Router();

// Create a new muscle group
router.post("/", [authenticate], muscleGroupController.create);

// Retrieve all muscle groups
router.get("/", [authenticate], muscleGroupController.findAll);

// Retrieve a single muscle group
router.get("/:id_muscle_group", [authenticate], muscleGroupController.findOne);

// Update a muscle group
router.put("/:id_muscle_group", [authenticate], muscleGroupController.update);

// Delete a muscle group
router.delete("/:id_muscle_group", [authenticate], muscleGroupController.delete);

export default router;
