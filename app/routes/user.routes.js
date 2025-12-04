import users from "../controllers/user.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

// Create a new User
router.post("/", [authenticate], users.create);

// Create a new Athlete
router.post("/create-athlete", [authenticate], users.createAthlete);

// Retrieve all People/Users
router.get("/", [authenticate], users.findAll);

// Retrieve all athletes
router.get("/athletes", [authenticate], users.findAllAthletes);

// Retrieve a single User with id_user
router.get("/:id_user", [authenticate], users.findOne);

// Update a User with id_user
router.put("/:id_user", [authenticate], users.update);

// Update User's Role
router.put("/role/:id_user", [authenticate], users.updateRole);

// Delete a User with id_user
router.delete("/:id_user", [authenticate], users.delete);

export default router;
