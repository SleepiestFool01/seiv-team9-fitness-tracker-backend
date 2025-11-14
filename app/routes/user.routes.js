import users from "../controllers/user.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

var router = Router();

router.put("/role/:id_user", users.update);

// Create a new User
//router.post("/", [authenticate], users.create);

// Retrieve all People/Users
//router.get("/", [authenticate], users.findAll);

// Retrieve a single User with id_user
//router.get("/:id_user", [authenticate], users.findOne);

// Retrieve all athletes
router.get("/athletes", [authenticate], users.findAllAthletes);


// (Optional) Get user by ID
router.get("/:id_user", users.findOne);

// Retrieve a single User profile with id_user
router.get("/profile/:id_user", users.findOne);

// (Optional) Get user profile by ID
router.get("/profile/:id_user", users.getProfile);

router.get("/athletes", users.findAllAthletes);

// Update a User with id_user
//router.put("/:id_user", [authenticate], users.update);

// Update user profile (no auth check for now, can add later)
router.put("/profile/:id_user", users.update);

// Update existing user
router.put("/:id_user", users.update);

// Delete a User
//router.delete("/:id_user", [authenticate], users.delete);

export default router;

