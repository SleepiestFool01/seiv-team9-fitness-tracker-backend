import db  from "../models/index.js";
const Tracker = db.tracker;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Tracker
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Tracker
  const tracker = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
  };
  // Save Tracker in the database
  Tracker.create(tracker)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tracker.",
      });
    });
};
// Retrieve all Trackers from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Tracker.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trackers.",
      });
    });
};

// Find a single Tracker with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Tracker.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Trackers for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Trackers for user with id=" + userId,
      });
    });
};
// Find a single Tracker with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tracker.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tracker with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Tracker with id=" + id,
      });
    });
};
// Update a Trakcer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Tracker.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tracker was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tracker with id=${id}. Maybe Tracker was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Tracker with id=" + id,
      });
    });
};
// Delete a Tracker with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Tracker.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tracker was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tracker with id=${id}. Maybe Tracker was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Tracker with id=" + id,
      });
    });
};

export default exports;