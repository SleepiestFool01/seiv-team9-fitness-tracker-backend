import db from "../models/index.js";

const UserTeam = db.user_team;
const exports = {};

// Create and Save a new user-team membership
exports.create = (req, res) => {
  const { id_user, id_team } = req.body;

  if (!id_user || !id_team) {
    return res.status(400).send({
      message: "id_user and id_team are required.",
    });
  }

  UserTeam.create({ id_user, id_team })
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating user-team membership.",
      })
    );
};

// Retrieve all memberships
exports.findAll = (_req, res) => {
  UserTeam.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving memberships.",
      })
    );
};

// Retrieve memberships for a user
exports.findAllForUser = (req, res) => {
  UserTeam.findAll({ where: { id_user: req.params.id_user } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving memberships.",
      })
    );
};

// Retrieve memberships for a team
exports.findAllForTeam = (req, res) => {
  UserTeam.findAll({ where: { id_team: req.params.id_team } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving memberships.",
      })
    );
};

// Delete membership
exports.delete = (req, res) => {
  const { id_user, id_team } = req.params;

  UserTeam.destroy({ where: { id_user, id_team } })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Membership not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting membership.",
      })
    );
};

export default exports;
