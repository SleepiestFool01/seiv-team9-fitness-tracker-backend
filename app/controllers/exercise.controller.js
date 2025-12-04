import db from "../models/index.js";

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

  // Create a Exercise
  const exercise = {
    id_lesson: req.params.id_lesson,
    name: req.body.name,
    description: req.body.description,
    reps: req.body.reps,
    sets: req.body.sets,
    published: req.body.published ? req.body.published : false,
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
  Exercise.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving all exercises."
      });
    });
};

// Retrieve all Exercises for a lesson from the database.
exports.findAllForLesson = (req, res) => {
  const id_lesson = req.params.id_lesson;

  Exercise.findAll({ where: { id_lesson } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exercises.",
      });
    });
};
// Find a single Exercise with an id
exports.findOne = (req, res) => {
  const id_exercise = req.params.id_exercise;
  Exercise.findByPk(id_exercise)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Exercise with id_exercise=${id_exercise}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Exercise with id_exercise=" + id_exercise,
      });
    });
};
// Update a Exercise by the id in the request
exports.update = (req, res) => {
  const id_exercise = req.params.id_exercise;
  Exercise.update(req.body, {
    where: { id_exercise },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Exercise with id_exercise=${id_exercise}. Maybe Exercise was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Exercise with id_exercise=" + id_exercise,
      });
    });
};
// Delete a Exercise with the specified id in the request
exports.delete = (req, res) => {
  const id_exercise = req.params.id_exercise;
  Exercise.destroy({
    where: { id_exercise },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Exercise with id_exercise=${id_exercise}. Maybe Exercise was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Exercise with id_exercise=" + id_exercise,
      });
    });
};

// Find all published Exercises
exports.findAllPublished = (req, res) => {
  const id_lesson = req.params.id_lesson;

  Exercise.findAll({
    where: { published: true, id_lesson },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exercises.",
      });
    });
};

export default exports;
