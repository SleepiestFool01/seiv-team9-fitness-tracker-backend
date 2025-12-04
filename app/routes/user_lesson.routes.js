import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import controller from "../controllers/user_lesson.controller.js";

const router = Router();

// Get lessons assigned to a user
router.get("/user/:id_user", [authenticate], controller.findAllForUser);

// Get users assigned to a lesson
router.get("/lesson/:id_lesson", [authenticate], controller.findAllForLesson);

// Assign a lesson to a user
router.post("/", [authenticate], controller.assignLesson);

// Remove an assignment
router.delete("/:id_user/:id_lesson", [authenticate], controller.removeAssignment);

export default router;
