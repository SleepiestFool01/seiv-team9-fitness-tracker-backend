import db from "../models/index.js";

const TeamGoalProgress = db.team_goal_progress;
const exports = {};

// Create and Save a new team goal progress entry
exports.create = (req, res) => {
  if (!req.body.id_team_goal) {
    return res.status(400).send({
      message: "id_team_goal is required.",
    });
  }

  TeamGoalProgress.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating team goal progress.",
      })
    );
};

// Retrieve all team goal progress entries
exports.findAll = (_req, res) => {
  TeamGoalProgress.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving team goal progress.",
      })
    );
};

// Retrieve progress entries for a team goal
exports.findAllForGoal = (req, res) => {
  TeamGoalProgress.findAll({ where: { id_team_goal: req.params.id_team_goal } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving team goal progress.",
      })
    );
};

// Retrieve single progress entry
exports.findOne = (req, res) => {
  TeamGoalProgress.findByPk(req.params.id_team_goal_progress)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Team goal progress not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving team goal progress.",
      })
    );
};

// Update a progress entry
exports.update = (req, res) => {
  TeamGoalProgress.update(req.body, {
    where: { id_team_goal_progress: req.params.id_team_goal_progress },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Team goal progress updated successfully." });
      } else {
        res.status(404).send({
          message: "Team goal progress not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating team goal progress.",
      })
    );
};

// Delete a progress entry
exports.delete = (req, res) => {
  TeamGoalProgress.destroy({
    where: { id_team_goal_progress: req.params.id_team_goal_progress },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Team goal progress not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting team goal progress.",
      })
    );
};

export default exports;
