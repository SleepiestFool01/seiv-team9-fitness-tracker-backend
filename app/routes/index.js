import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tracker.routes.js";



const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/trackers", TrackerRoutes);


export default router;
