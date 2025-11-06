import users from "../controllers/user.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

var router = Router();

router.put("/role/:id_user", users.update);

// Create a new User
router.post("/", [authenticate], users.create);

// Retrieve all People/Users
router.get("/", [authenticate], users.findAll);

// Retrieve a single User with id_user
router.get("/:id_user", [authenticate], users.findOne);

router.get("/profile/:id_user", users.findOne);

// Update a User with id_user
router.put("/:id_user", [authenticate], users.update);

// Delete a User
router.delete("/:id_user", [authenticate], users.delete);

export default router;

