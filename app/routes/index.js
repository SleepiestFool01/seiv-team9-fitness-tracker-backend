import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import LessonRoutes from "./lesson.routes.js";
import ExerciseRoutes from "./exercise.routes.js";
import CatalogRoutes from "./catalog.routes.js";
import MuscleGroupRoutes from "./muscle_group.routes.js";
import PlayerGoalRoutes from "./player_goal.routes.js";
import PlayerGoalProgressRoutes from "./player_goal_progress.routes.js";
import SessionRoutes from "./session.routes.js";
import TeamRoutes from "./team.routes.js";
import TeamLessonRoutes from "./team_lesson.routes.js";
import TeamGoalRoutes from "./team_goal.routes.js";
import TeamGoalProgressRoutes from "./team_goal_progress.routes.js";
import UserMetricRoutes from "./user_metric.routes.js";
import UserTeamRoutes from "./user_team.routes.js";
import UserLessonRoutes from "./user_lesson.routes.js";


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/lessons", LessonRoutes);
router.use("/lesson", ExerciseRoutes);//lesson because exercises are stored within a lesson I might change this later
router.use("/catalog", CatalogRoutes);
router.use("/muscle-groups", MuscleGroupRoutes);
router.use("/player-goals", PlayerGoalRoutes);
router.use("/player-goal-progress", PlayerGoalProgressRoutes);
router.use("/sessions", SessionRoutes);
router.use("/teams", TeamRoutes);
router.use("/team-lessons", TeamLessonRoutes);   
router.use("/team-goals", TeamGoalRoutes);
router.use("/team-goal-progress", TeamGoalProgressRoutes);
router.use("/user-metrics", UserMetricRoutes);
router.use("/user-teams", UserTeamRoutes);
router.use("/user-lessons", UserLessonRoutes);
router.use("/exercises", ExerciseRoutes);

export default router;
