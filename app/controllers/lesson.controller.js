import db from "../models/index.js";

const Lesson = db.lesson;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Lesson
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Lesson
  const lesson = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    id_user: req.body.id_user,
  };
  // Save Lesson in the database
  Lesson.create(lesson)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lesson.",
      });
    });
};
// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Lesson.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lessons.",
      });
    });
};

// Find a single Lesson with an id
exports.findAllForUser = (req, res) => {
  const id_user = req.params.id_user;
  Lesson.findAll({ where: { id_user } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lessons for user with id_user=${id_user}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Lessons for user with id_user=" + id_user,
      });
    });
};
// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id_lesson = req.params.id_lesson;
  Lesson.findByPk(id_lesson)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lesson with id_lesson=${id_lesson}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Lesson with id_lesson=" + id_lesson,
      });
    });
};
// Update a Lesson by the id in the request
exports.update = (req, res) => {
  const id_lesson = req.params.id_lesson;
  Lesson.update(req.body, {
    where: { id_lesson },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id_lesson=${id_lesson}. Maybe Lesson was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Lesson with id_lesson=" + id_lesson,
      });
    });
};
// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
  const id_lesson = req.params.id_lesson;
  Lesson.destroy({
    where: { id_lesson },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Lesson with id_lesson=${id_lesson}. Maybe Lesson was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Lesson with id_lesson=" + id_lesson,
      });
    });
};

export default exports;
