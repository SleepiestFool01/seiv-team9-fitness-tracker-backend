import db from "../models/index.js";

const Lesson = db.lesson;
const UserLesson = db.user_lesson;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Lesson, optionally assigning to multiple users
exports.create = async (req, res) => {
  if (!req.body.title || !req.body.id_muscle_group) {
    return res.status(400).send({
      message: "title and id_muscle_group are required."
    });
  }

  const assignedUsers = Array.isArray(req.body.assignedUsers)
    ? req.body.assignedUsers
    : (req.body.id_user ? [req.body.id_user] : []);

  const lesson = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
    id_user: req.body.id_user, // still store creator/owner if provided
    id_muscle_group: req.body.id_muscle_group,
  };

  const t = await db.sequelize.transaction();
  try {
    const createdLesson = await Lesson.create(lesson, { transaction: t });

    if (assignedUsers.length) {
      const rows = assignedUsers.map((id_user) => ({
        id_user,
        id_lesson: createdLesson.id_lesson,
      }));
      await UserLesson.bulkCreate(rows, {
        transaction: t,
        ignoreDuplicates: true,
      });
    }

    await t.commit();
    res.send(createdLesson);
  } catch (err) {
    await t.rollback();
    console.error("LESSON CREATE ERROR:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Lesson.",
    });
  }
};

// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Lesson.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lessons.",
      });
    });
};

// (Deprecated) Direct lessons by owner; keep for compatibility but prefer user_lesson
exports.findAllForUser = (req, res) => {
  const id_user = req.params.id_user;
  Lesson.findAll({ where: { id_user } })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Lessons for user with id_user=" + id_user,
      });
    });
};

// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id_lesson = req.params.id_lesson;
  Lesson.findByPk(id_lesson)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lesson with id_lesson=${id_lesson}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Lesson with id_lesson=" + id_lesson,
      });
    });
};

// Update a Lesson by the id in the request
exports.update = (req, res) => {
  const id_lesson = req.params.id_lesson;
  Lesson.update(req.body, {
    where: { id_lesson },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id_lesson=${id_lesson}. Maybe Lesson was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Lesson with id_lesson=" + id_lesson,
      });
    });
};
// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
  const id_lesson = req.params.id_lesson;
  Lesson.destroy({
    where: { id_lesson },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Lesson with id_lesson=${id_lesson}. Maybe Lesson was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Lesson with id_lesson=" + id_lesson,
      });
    });
};

export default exports;
