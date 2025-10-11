import db  from "../models/index.js";
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
    userId: req.body.userId,
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
  const userId = req.params.userId;
  Lesson.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lessons for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Lessons for user with id=" + userId,
      });
    });
};
// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Lesson.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lesson with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Lesson with id=" + id,
      });
    });
};
// Update a Trakcer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Lesson.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Lesson with id=" + id,
      });
    });
};
// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Lesson.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Lesson with id=" + id,
      });
    });
};

export default exports;
