  import exercises from "../controllers/exercise.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Retrieve all Exercises (regardless of lesson)
  router.get("/", [authenticate], exercises.findAll);

  // Create a new Exercise for a Lesson
  router.post("/:id_lesson/exercises", [authenticate], exercises.create);

  // Retrieve all Exercises for a Lesson
  router.get("/:id_lesson/exercises", [authenticate], exercises.findAllForLesson);

  // Retrieve all published Exercises for a Lesson
  router.get( "/:id_lesson/exercises/published", [authenticate], exercises.findAllPublished );

  // Retrieve a single Exercise with id_exercise
  router.get( "/:id_lesson/exercises/:id_exercise", [authenticate], exercises.findOne );

  // Update an Exercise with id_exercise
  router.put( "/:id_lesson/exercises/:id_exercise", [authenticate], exercises.update );

  // Delete an Exercise with id_exercise
  router.delete( "/:id_lesson/exercises/:id_exercise", [authenticate], exercises.delete );

export default router;
