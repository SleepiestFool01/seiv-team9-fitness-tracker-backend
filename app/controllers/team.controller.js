import db from "../models/index.js";

const Team = db.team;
const exports = {};

// Create and Save a new team
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name is required.",
    });
  }

  Team.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating team.",
      })
    );
};

// Retrieve all teams
exports.findAll = async (_req, res) => {
  try {
    const teams = await Team.findAll({
      attributes: ["id_team", "name", "description"]
    });

    res.send(teams);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving teams."
    });
  }
};


// Retrieve single team
exports.findOne = (req, res) => {
  Team.findByPk(req.params.id_team)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Team not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving team.",
      })
    );
};

// Update team
exports.update = (req, res) => {
  Team.update(req.body, { where: { id_team: req.params.id_team } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Team updated successfully." });
      } else {
        res.status(404).send({
          message: "Team not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating team.",
      })
    );
};

// Delete team
exports.delete = (req, res) => {
  Team.destroy({ where: { id_team: req.params.id_team } })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Team not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting team.",
      })
    );
};

export default exports;
