import db from "../models/index.js";

const MuscleGroup = db.muscle_group;
const exports = {};

// Create and Save a new muscle group
exports.create = (req, res) => {
  if (!req.body.muscle) {
    return res.status(400).send({
      message: "muscle is required.",
    });
  }

  MuscleGroup.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating muscle group.",
      })
    );
};

// Retrieve all muscle groups
exports.findAll = (_req, res) => {
  MuscleGroup.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving muscle groups.",
      })
    );
};

// Retrieve single muscle group by id
exports.findOne = (req, res) => {
  MuscleGroup.findByPk(req.params.id_muscle_group)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Muscle group not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving muscle group.",
      })
    );
};

// Update a muscle group
exports.update = (req, res) => {
  MuscleGroup.update(req.body, {
    where: { id_muscle_group: req.params.id_muscle_group },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Muscle group updated successfully." });
      } else {
        res.status(404).send({
          message: "Muscle group not found or body empty.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error updating muscle group.",
      })
    );
};

// Delete a muscle group
exports.delete = (req, res) => {
  MuscleGroup.destroy({
    where: { id_muscle_group: req.params.id_muscle_group },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Muscle group not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting muscle group.",
      })
    );
};

export default exports;
