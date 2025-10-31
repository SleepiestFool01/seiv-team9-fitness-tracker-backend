import db from "../models/index.js";

const PlayerGoalProgress = db.player_goal_progress;
const exports = {};

// Create and Save a new progress entry
exports.create = (req, res) => {
  if (!req.body.id_player_goal) {
    return res.status(400).send({
      message: "id_player_goal is required.",
    });
  }

  PlayerGoalProgress.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating progress entry.",
      })
    );
};

// Retrieve all progress entries
exports.findAll = (_req, res) => {
  PlayerGoalProgress.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving progress entries.",
      })
    );
};

// Retrieve progress entries for a goal
exports.findAllForGoal = (req, res) => {
  PlayerGoalProgress.findAll({
    where: { id_player_goal: req.params.id_player_goal },
  })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving progress entries.",
      })
    );
};

// Retrieve single progress entry
exports.findOne = (req, res) => {
  PlayerGoalProgress.findByPk(req.params.id_player_goal_progress)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Progress entry not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving progress entry.",
      })
    );
};

// Update progress entry
exports.update = (req, res) => {
  PlayerGoalProgress.update(req.body, {
    where: { id_player_goal_progress: req.params.id_player_goal_progress },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Progress entry updated successfully." });
      } else {
        res.status(404).send({
          message: "Progress entry not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating progress entry.",
      })
    );
};

// Delete progress entry
exports.delete = (req, res) => {
  PlayerGoalProgress.destroy({
    where: { id_player_goal_progress: req.params.id_player_goal_progress },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Progress entry not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting progress entry.",
      })
    );
};

export default exports;
