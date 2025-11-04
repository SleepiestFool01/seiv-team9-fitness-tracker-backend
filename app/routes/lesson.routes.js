  import lessons from "../controllers/lesson.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Lesson
  router.post("/", [authenticate], lessons.create);

  // Retrieve all Lessons
  router.get("/", [authenticate], lessons.findAll);

  // Retrieve all Lessons for a user
  router.get("/userLesson/:id_user", [authenticate], lessons.findAllForUser);

  // Retrieve a single Lesson with id_lesson
  router.get("/:id_lesson", [authenticate], lessons.findOne);

  // Update a Lesson with id_lesson
  router.put("/:id_lesson", [authenticate], lessons.update);

  // Delete a Lesson with id_lesson
  router.delete("/:id_lesson", [authenticate], lessons.delete);


  export default router;
