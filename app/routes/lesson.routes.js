  import lessons from "../controllers/lesson.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tracker
  router.post("/", [authenticate], lessons.create);

  // Retrieve all Lessons
  router.get("/", [authenticate], lessons.findAll);

  // Retrieve all Lessons for user
  router.get("/userTut/:userId", [authenticate], lessons.findAllForUser);

  // Retrieve a single Tracker with id
  router.get("/:id", [authenticate], lessons.findOne);

  // Update a Tracker with id
  router.put("/:id", [authenticate], lessons.update);

  // Delete a Tracker with id
  router.delete("/:id", [authenticate], lessons.delete);


  export default router;

