import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import userTeamController from "../controllers/user_team.controller.js";

const router = Router();

// Create a new membership
router.post("/", userTeamController.create);

// Retrieve all memberships
router.get("/", userTeamController.findAll);

// Retrieve memberships for a specific user
router.get("/user/:id_user", userTeamController.findAllForUser);

// Retrieve memberships for a specific team
router.get("/team/:id_team", userTeamController.findAllForTeam);

// Delete a membership
router.delete("/:id_user/:id_team", userTeamController.delete);

export default router;
