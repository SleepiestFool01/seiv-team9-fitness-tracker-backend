import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import playerGoalProgressController from "../controllers/player_goal_progress.controller.js";

const router = Router();

// Create a new player goal progress entry
router.post("/", [authenticate], playerGoalProgressController.create);

// Retrieve all player goal progress entries
router.get("/", [authenticate], playerGoalProgressController.findAll);

// Retrieve progress entries for a specific goal
router.get("/goal/:id_player_goal", [authenticate], playerGoalProgressController.findAllForGoal);

// Retrieve a single progress entry
router.get("/:id_player_goal_progress", [authenticate], playerGoalProgressController.findOne);

// Update a progress entry
router.put("/:id_player_goal_progress", [authenticate], playerGoalProgressController.update);

// Delete a progress entry
router.delete("/:id_player_goal_progress", [authenticate], playerGoalProgressController.delete);

export default router;
