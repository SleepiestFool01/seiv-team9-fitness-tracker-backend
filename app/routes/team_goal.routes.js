import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import teamGoalController from "../controllers/team_goal.controller.js";

const router = Router();

// Create a new team goal
router.post("/", [authenticate], teamGoalController.create);

// Retrieve all team goals
router.get("/", [authenticate], teamGoalController.findAll);

// Retrieve team goals for a specific team
router.get("/team/:id_team", [authenticate], teamGoalController.findAllForTeam);

// Retrieve a single team goal
router.get("/:id_team_goal", [authenticate], teamGoalController.findOne);

// Update a team goal
router.put("/:id_team_goal", [authenticate], teamGoalController.update);

// Delete a team goal
router.delete("/:id_team_goal", [authenticate], teamGoalController.delete);

export default router;
