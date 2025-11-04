import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import teamGoalProgressController from "../controllers/team_goal_progress.controller.js";

const router = Router();

// Create a new team goal progress entry
router.post("/", [authenticate], teamGoalProgressController.create);

// Retrieve all team goal progress entries
router.get("/", [authenticate], teamGoalProgressController.findAll);

// Retrieve progress entries for a specific team goal
router.get("/goal/:id_team_goal", [authenticate], teamGoalProgressController.findAllForGoal);

// Retrieve a single team goal progress entry
router.get("/:id_team_goal_progress", [authenticate], teamGoalProgressController.findOne);

// Update a team goal progress entry
router.put("/:id_team_goal_progress", [authenticate], teamGoalProgressController.update);

// Delete a team goal progress entry
router.delete("/:id_team_goal_progress", [authenticate], teamGoalProgressController.delete);

export default router;
