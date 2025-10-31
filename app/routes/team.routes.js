import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import teamController from "../controllers/team.controller.js";

const router = Router();

// Create a new team
router.post("/", [authenticate], teamController.create);

// Retrieve all teams
router.get("/", [authenticate], teamController.findAll);

// Retrieve a single team
router.get("/:id_team", [authenticate], teamController.findOne);

// Update a team
router.put("/:id_team", [authenticate], teamController.update);

// Delete a team
router.delete("/:id_team", [authenticate], teamController.delete);

export default router;
