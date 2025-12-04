import db from "../models/index.js";

const UserMetric = db.user_metric;
const exports = {};

// Create and Save a new user metric
exports.create = (req, res) => {
  if (!req.body.id_user) {
    return res.status(400).send({
      message: "id_user is required.",
    });
  }

  UserMetric.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating user metric.",
      })
    );
};

// Retrieve all user metrics
exports.findAll = (_req, res) => {
  UserMetric.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving user metrics.",
      })
    );
};

// Retrieve metrics for a user
exports.findAllForUser = (req, res) => {
  UserMetric.findAll({
    where: { id_user: req.params.id_user },
    order: [["recorded_at", "ASC"]],
  })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving user metrics.",
      })
    );
};

// Retrieve most recent metric for a user
exports.findLatestForUser = (req, res) => {
  UserMetric.findOne({
    where: { id_user: req.params.id_user },
    order: [["recorded_at", "DESC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "No metrics found for this user.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving latest user metric.",
      })
    );
};

// Retrieve single metric entry
exports.findOne = (req, res) => {
  UserMetric.findByPk(req.params.id_user_metric)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "User metric not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving user metric.",
      })
    );
};

// Update user metric
exports.update = (req, res) => {
  UserMetric.update(req.body, {
    where: { id_user_metric: req.params.id_user_metric },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "User metric updated successfully." });
      } else {
        res.status(404).send({
          message: "User metric not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating user metric.",
      })
    );
};

// Delete user metric
exports.delete = (req, res) => {
  UserMetric.destroy({
    where: { id_user_metric: req.params.id_user_metric },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "User metric not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting user metric.",
      })
    );
};

export default exports;
