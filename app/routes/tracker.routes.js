  import trackers from "../controllers/tracker.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tracker
  router.post("/", [authenticate], trackers.create);

  // Retrieve all Trackers
  router.get("/", [authenticate], trackers.findAll);

  // Retrieve all Trackers for user
  router.get("/userTut/:userId", [authenticate], trackers.findAllForUser);

  // Retrieve a single Tracker with id
  router.get("/:id", [authenticate], trackers.findOne);

  // Update a Tracker with id
  router.put("/:id", [authenticate], trackers.update);

  // Delete a Tracker with id
  router.delete("/:id", [authenticate], trackers.delete);


  export default router;

