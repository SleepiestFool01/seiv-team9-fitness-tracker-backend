import db from "../models/index.js";

const Catalog = db.catalog;
const exports = {};

// Create and Save a new catalog entry
exports.create = (req, res) => {
  const { id_user, id_lesson } = req.body;

  if (!id_user || !id_lesson) {
    return res.status(400).send({
      message: "id_user and id_lesson are required.",
    });
  }

  Catalog.create({ id_user, id_lesson })
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error creating catalog entry.",
      })
    );
};

// Retrieve all catalog entries
exports.findAll = (_req, res) => {
  Catalog.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving catalog entries.",
      })
    );
};

// Retrieve all catalog entries for a user
exports.findAllForUser = (req, res) => {
  Catalog.findAll({ where: { id_user: req.params.id_user } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving catalog entries.",
      })
    );
};

// Retrieve single catalog entry by composite key
exports.findOne = (req, res) => {
  const { id_user, id_lesson } = req.params;

  Catalog.findOne({ where: { id_user, id_lesson } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Catalog entry not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving catalog entry.",
      })
    );
};

// Delete catalog entry
exports.delete = (req, res) => {
  const { id_user, id_lesson } = req.params;

  Catalog.destroy({ where: { id_user, id_lesson } })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Catalog entry not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting catalog entry.",
      })
    );
};

export default exports;
