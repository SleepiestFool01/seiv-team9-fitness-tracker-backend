import db from "../models/index.js";

const Session = db.session;
const exports = {};

// Create and Save a new session
exports.create = (req, res) => {
  if (!req.body.id_user || !req.body.token || !req.body.expirationDate) {
    return res.status(400).send({
      message: "id_user, token, and expirationDate are required.",
    });
  }

  Session.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating session.",
      })
    );
};

// Retrieve all sessions
exports.findAll = (_req, res) => {
  Session.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving sessions.",
      })
    );
};

// Retrieve sessions for a user
exports.findAllForUser = (req, res) => {
  Session.findAll({ where: { id_user: req.params.id_user } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving sessions.",
      })
    );
};

// Retrieve single session
exports.findOne = (req, res) => {
  Session.findByPk(req.params.id_session)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Session not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving session.",
      })
    );
};

// Update session
exports.update = (req, res) => {
  Session.update(req.body, { where: { id_session: req.params.id_session } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Session updated successfully." });
      } else {
        res.status(404).send({
          message: "Session not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating session.",
      })
    );
};

// Delete session
exports.delete = (req, res) => {
  Session.destroy({ where: { id_session: req.params.id_session } })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Session not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting session.",
      })
    );
};

export default exports;
