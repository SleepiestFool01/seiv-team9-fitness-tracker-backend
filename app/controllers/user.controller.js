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
    bio: req.body.bio ?? undefined,
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

// Find all users with role = "athlete"
exports.findAllAthletes = (req, res) => {
  db.user
    .findAll({ where: { role: "athletes" } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving athletes.",
      });
    });
};

exports.createAthlete = (req, res) => {
  const athlete = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    role: "athletes",
    bio: req.body.bio ?? undefined,
  };

  User.create(athlete)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating athlete."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id_user = req.params.id_user;

  User.findByPk(id_user)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id_user=${id_user}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id_user=" + id_user,
      });
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

// Update a User by the id in the request
exports.update = (req, res) => {
  const id_user = req.params.id_user;

  User.update(req.body, {
    where: { id_user },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id_user=${id_user}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id_user=" + id_user,
      });
    });
};

console.log("update reached");

exports.updateRole = (req, res) => {
  const id_user = req.params.id_user;
  const {role} = req.body;

  User.update({ role }, {
    where: { id_user },
  })
  .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.stats(404).send({
          message: `Cannot update User Role with id_user=${id_user}. User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User's role with id_user=" + id_user,
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
