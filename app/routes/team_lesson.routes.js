// app/routes/team_lesson.routes.js
import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import teamLessonController from "../controllers/team_lesson.controller.js";

const router = Router();

// Create new assignment (plan → team)
router.post("/", [authenticate], teamLessonController.create);

// All mappings (optional/debug)
router.get("/", [authenticate], teamLessonController.findAll);

// Get all plans for a specific team
router.get("/team/:id_team", [authenticate], teamLessonController.findAllForTeam);

// Get all teams for a specific lesson
router.get("/lesson/:id_lesson", [authenticate], teamLessonController.findAllForLesson);

// Remove plan from team
router.delete("/:id_team/:id_lesson", [authenticate], teamLessonController.delete);

export default router;
