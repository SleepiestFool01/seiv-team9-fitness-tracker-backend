import db from "../models/index.js";

const User = db.user;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id_user = req.query.id_user;
  const condition = id_user
    ? { id_user: { [Op.like]: `%${id_user}%` } }
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Get all athletes
exports.findAllAthletes = (req, res) => {
  db.user.findAll({ where: { role: "athlete" } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving athletes."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id_user = req.params.id_user;

  User.findByPk(id_user)
    .then((data) => {
      if (data) {
        res.send(data); // ✅ this sends your profile data
      } else {
        res.status(404).send({ message: `Cannot find User with id_user=${id_user}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id_user=" + id_user });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

// Retrieve user profile easily
exports.getProfile = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const data = await User.findByPk(id_user);

    if (!data) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Update a User by the id in the request
exports.update = async (req, res) => {
  const id_user = req.params.id_user;

  // Only allow valid fields to be updated
  const allowedFields = ["fName", "lName", "email", "role"];
  const updateData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  console.log("Updating user:", id_user, "with:", updateData);

  try {
    const [rowsUpdated] = await User.update(updateData, {
      where: { id_user }
    });

    if (rowsUpdated === 1) {
      res.send({ message: "User updated successfully!" });
    } else {
      res.status(400).send({ message: "⚠️ No user updated" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating user: " + err });
  }
};

// Update only the role field
exports.updateRole = (req, res) => {
  const id_user = req.params.id_user;
  const role = req.body.role;

  if (!role) {
    return res.status(400).send({ message: "Role cannot be empty!" });
  }

  User.update({ role }, { where: { id_user } })
    .then(([count]) => {
      if (count === 1) {
        res.send({ message: "Role updated successfully!", role });
      } else {
        res.status(404).send({
          message: `User not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating role: " + err.message,
      });
    });
};



// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id_user = req.params.id_user;

  User.destroy({
    where: { id_user },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id_user=${id_user}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id_user=" + id_user,
      });
    });
};


export default exports;
