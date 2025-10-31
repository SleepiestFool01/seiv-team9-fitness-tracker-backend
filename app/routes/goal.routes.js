import goals from "../controllers/goal.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

var router = Router()

// Create a new Goal for a User 
  router.post("/:id_user/goals", [authenticate], goal.create);

  // Retrieve all Goals for a User
  router.get("/:id_user/goals", [authenticate], goals.findAllForUser);


//I'm still deciding if I want to add functionality for a published and not published goal, if itll just be null or whatever
// // Retrieve all published goals for a User
  router.get( "/:id_user/goals/published", [authenticate], goals.findAllPublished);

  // Retrieve a single Goal with id_goal
  router.get( "/:id_user/goals/:id_goal", [authenticate], goals.findOne);

  // Update an Exercise with id_goal
  router.put("/:id_user/goals/:id_goal", [authenticate], goals.update );

  // Delete an Goal with id_goal 
  router.delete("/:id_user/goals/:id_goal", [authenticate], goals.delete );

export default router;
