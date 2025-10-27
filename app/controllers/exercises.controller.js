import db  from "../models/index.js";
const Exercise = db.exercise;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Exercise
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create an Exercise
  const exercise = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    reps: req.body.reps,
    sets: req.body.sets,
    userId: req.body.userId
  };
  // Save Exercise in the database
  Exercise.create(exercise)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exercise.",
      });
    });
};

// Retrieve all Exercises from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  Exercise.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exercises.",
      });
    });
};

// Retrieve all Exercises for a user from the database.
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Exercise.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Exercises for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Exercises for user with id=" + userId,
      });
    });
};

// Find a single Exercise with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Exercise with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Exercise with id=" + id,
      });
    });
};
// Update an Exercise by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Exercise.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Exercise with id=${id}. Maybe Exercise was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Exercise with id=" + id,
      });
    });
};
// Delete an Exercise with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Exercise with id=${id}. Maybe Exercise was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Exercise with id=" + id,
      });
    });
};

export default exports;