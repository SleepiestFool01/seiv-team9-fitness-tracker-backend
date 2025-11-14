import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import teamController from "../controllers/team.controller.js";

const router = Router();

// Create a new team
router.post("/", teamController.create);

// Retrieve all teams
router.get("/", teamController.findAll);

// Retrieve a single team
router.get("/:id_team", teamController.findOne);

// Update a team
router.put("/:id_team", teamController.update);

// Delete a team
router.delete("/:id_team", teamController.delete);

export default router;
