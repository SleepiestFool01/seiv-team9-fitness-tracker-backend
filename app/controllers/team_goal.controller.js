import db from "../models/index.js";

const TeamGoal = db.team_goal;
const exports = {};

// Create and Save a new team goal
exports.create = (req, res) => {
  if (!req.body.id_team || !req.body.id_exercise) {
    return res.status(400).send({
      message: "id_team and id_exercise are required.",
    });
  }

  TeamGoal.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating team goal.",
      })
    );
};

// Retrieve all team goals
exports.findAll = (_req, res) => {
  TeamGoal.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving team goals.",
      })
    );
};

// Retrieve team goals for a specific team
exports.findAllForTeam = (req, res) => {
  TeamGoal.findAll({ where: { id_team: req.params.id_team } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving team goals.",
      })
    );
};

// Retrieve a single team goal
exports.findOne = (req, res) => {
  TeamGoal.findByPk(req.params.id_team_goal)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Team goal not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving team goal.",
      })
    );
};

// Update a team goal
exports.update = (req, res) => {
  TeamGoal.update(req.body, { where: { id_team_goal: req.params.id_team_goal } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Team goal updated successfully." });
      } else {
        res.status(404).send({
          message: "Team goal not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating team goal.",
      })
    );
};

// Delete a team goal
exports.delete = (req, res) => {
  TeamGoal.destroy({ where: { id_team_goal: req.params.id_team_goal } })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Team goal not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting team goal.",
      })
    );
};

export default exports;
