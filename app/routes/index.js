import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";



const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);


export default router;
