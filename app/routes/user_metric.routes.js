import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import userMetricController from "../controllers/user_metric.controller.js";

const router = Router();

// Create a new user metric
router.post("/", [authenticate], userMetricController.create);

// Retrieve all user metrics
router.get("/", [authenticate], userMetricController.findAll);

// Retrieve metrics for a specific user
router.get(
  "/user/:id_user/latest",
  [authenticate],
  userMetricController.findLatestForUser
);
router.get("/user/:id_user", [authenticate], userMetricController.findAllForUser);

// Retrieve a single user metric
router.get("/:id_user_metric", [authenticate], userMetricController.findOne);

// Update a user metric
router.put("/:id_user_metric", [authenticate], userMetricController.update);

// Delete a user metric
router.delete("/:id_user_metric", [authenticate], userMetricController.delete);

export default router;
