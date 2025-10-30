import db from "../models/index.js";

const Goal = db.goal;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Goal 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Exercise
  const exercise = {
    id_user: req.params.id_user,
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  // Save Exercise in the database
  Exercise.create(exercise)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exercise.",
      });
    });
};
