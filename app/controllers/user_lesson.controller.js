import db from "../models/index.js";

const User_Lesson = db.user_lesson;
const Lesson = db.lesson;
const exports = {};

// Get all lessons assigned to a user (includes lesson details)
exports.findAllForUser = async (req, res) => {
  const id_user = req.params.id_user;
  try {
    const assignments = await User_Lesson.findAll({
      where: { id_user },
      include: [{ model: Lesson, as: "lesson" }],
    });
    res.send(assignments);
  } catch (err) {
    console.error("Error fetching user lessons", err);
    res.status(500).send({
      message: err.message || "Error retrieving lessons for user.",
    });
  }
};

// Get all users assigned to a lesson (includes user details)
exports.findAllForLesson = async (req, res) => {
  const id_lesson = req.params.id_lesson;
  try {
    const assignments = await User_Lesson.findAll({
      where: { id_lesson },
      include: [{ model: db.user, as: "user" }],
    });
    res.send(assignments);
  } catch (err) {
    console.error("Error fetching lesson assignments", err);
    res.status(500).send({
      message: err.message || "Error retrieving users for lesson.",
    });
  }
};

// Assign a lesson to a user
exports.assignLesson = async (req, res) => {
  const { id_user, id_lesson } = req.body;
  if (!id_user || !id_lesson) {
    return res.status(400).send({ message: "id_user and id_lesson are required." });
  }
  try {
    // Avoid duplicates
    const [assignment, created] = await User_Lesson.findOrCreate({
      where: { id_user, id_lesson },
      defaults: { id_user, id_lesson },
    });
    res.send(assignment);
  } catch (err) {
    console.error("Error assigning lesson", err);
    res.status(500).send({
      message: err.message || "Error assigning lesson to user.",
    });
  }
};

// Remove an assignment
exports.removeAssignment = async (req, res) => {
  const { id_user, id_lesson } = req.params;
  try {
    const count = await User_Lesson.destroy({ where: { id_user, id_lesson } });
    if (count) return res.send({ message: "Assignment removed." });
    return res.status(404).send({ message: "Assignment not found." });
  } catch (err) {
    console.error("Error removing assignment", err);
    res.status(500).send({
      message: err.message || "Error removing lesson assignment.",
    });
  }
};

export default exports;
