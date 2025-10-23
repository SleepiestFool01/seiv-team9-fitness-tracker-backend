  import exercises from "../controllers/exercises.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Exercise
  router.post("/", [authenticate], exercises.create);

  // Retrieve all Exercises
  router.get("/", [authenticate], exercises.findAll);

  // Retrieve all Exercises for user
  // router.get("/userTut/:userId", [authenticate], tutorials.findAllForUser);

  // Retrieve a single Exercise with id
  router.get("/:id", [authenticate], exercises.findOne);

  // Update an Exercise with id
  router.put("/:id", [authenticate], exercises.update);

  // Delete an Exercise with id
  router.delete("/:id", [authenticate], exercises.delete);


  export default router;