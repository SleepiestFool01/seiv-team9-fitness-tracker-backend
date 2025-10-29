  import users from "../controllers/user.controller.js";
  import  authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/", [authenticate], users.create);

  // Retrieve all People/Users
  router.get("/", [authenticate], users.findAll);

  // Retrieve a single User with id_user
  router.get("/:id_user", [authenticate], users.findOne);

  // Update a User with id_user
  router.put("/:id_user", [authenticate], users.update);

  // Delete a User with id_user
  router.delete("/:id_user", [authenticate], users.delete);


  export default router;
