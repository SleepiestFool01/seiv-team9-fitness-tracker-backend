import db from "../models/index.js";

const PlayerGoal = db.player_goal;
const exports = {};

// Create and Save a new player goal
exports.create = (req, res) => {
  if (!req.body.id_user || !req.body.id_exercise) {
    return res.status(400).send({
      message: "id_user and id_exercise are required.",
    });
  }

  PlayerGoal.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating player goal.",
      })
    );
};

// Retrieve all player goals
exports.findAll = (_req, res) => {
  PlayerGoal.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving player goals.",
      })
    );
};

// Retrieve player goals for a specific user
exports.findAllForUser = (req, res) => {
  PlayerGoal.findAll({ where: { id_user: req.params.id_user } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving player goals.",
      })
    );
};

// Retrieve a single player goal
exports.findOne = (req, res) => {
  PlayerGoal.findByPk(req.params.id_player_goal)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Player goal not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving player goal.",
      })
    );
};

// Update a player goal
exports.update = (req, res) => {
  PlayerGoal.update(req.body, {
    where: { id_player_goal: req.params.id_player_goal },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Player goal updated successfully." });
      } else {
        res.status(404).send({
          message: "Player goal not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating player goal.",
      })
    );
};

// Delete a player goal
exports.delete = (req, res) => {
  PlayerGoal.destroy({
    where: { id_player_goal: req.params.id_player_goal },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Player goal not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting player goal.",
      })
    );
};

export default exports;
