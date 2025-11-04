import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import playerGoalController from "../controllers/player_goal.controller.js";

const router = Router();

// Create a new player goal
router.post("/", [authenticate], playerGoalController.create);

// Retrieve all player goals
router.get("/", [authenticate], playerGoalController.findAll);

// Retrieve player goals for a specific user
router.get("/user/:id_user", [authenticate], playerGoalController.findAllForUser);

// Retrieve a single player goal by id
router.get("/:id_player_goal", [authenticate], playerGoalController.findOne);

// Update a player goal
router.put("/:id_player_goal", [authenticate], playerGoalController.update);

// Delete a player goal
router.delete("/:id_player_goal", [authenticate], playerGoalController.delete);

export default router;
