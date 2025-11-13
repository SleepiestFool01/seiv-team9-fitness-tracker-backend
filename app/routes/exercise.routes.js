  import exercises from "../controllers/exercise.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new Exercise for a Lesson
  router.post("/:id_lesson/exercises", exercises.create);

  // Retrieve all Exercises for a Lesson
  router.get("/:id_lesson/exercises", exercises.findAllForLesson);

  // Retrieve all published Exercises for a Lesson
  router.get( "/:id_lesson/exercises/published", exercises.findAllPublished );

  // Retrieve a single Exercise with id_exercise
  router.get( "/:id_lesson/exercises/:id_exercise", exercises.findOne );

  // Update an Exercise with id_exercise
  router.put( "/:id_lesson/exercises/:id_exercise", exercises.update );

  // Delete an Exercise with id_exercise
  router.delete( "/:id_lesson/exercises/:id_exercise", exercises.delete );

export default router;
