import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import userTeamController from "../controllers/user_team.controller.js";

const router = Router();

// Create a new membership
router.post("/", [authenticate], userTeamController.create);

// Retrieve all memberships
router.get("/", [authenticate], userTeamController.findAll);

// Retrieve memberships for a specific user
router.get("/user/:id_user", [authenticate], userTeamController.findAllForUser);

// Retrieve memberships for a specific team
router.get("/team/:id_team", [authenticate], userTeamController.findAllForTeam);

// Delete a membership
router.delete("/:id_user/:id_team", [authenticate], userTeamController.delete);

export default router;
