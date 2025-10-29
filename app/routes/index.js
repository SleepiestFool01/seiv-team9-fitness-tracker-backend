import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import LessonRoutes from "./lesson.routes.js";
import ExerciseRoutes from "./exercise.routes.js";


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/lessons", LessonRoutes);
router.use("/exercise", ExerciseRoutes);

export default router;