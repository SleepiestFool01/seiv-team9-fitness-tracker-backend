// app/controllers/team_lesson.controller.js
import db from "../models/index.js";

const TeamLesson = db.team_lesson;
const exportsObj = {};

// Create a new team–lesson link (assign plan to team)
exportsObj.create = async (req, res) => {
  const { id_team, id_lesson } = req.body;

  if (!id_team || !id_lesson) {
    return res.status(400).send({
      message: "id_team and id_lesson are required.",
    });
  }

  try {
    const link = await TeamLesson.create({ id_team, id_lesson });
    res.status(201).send(link);
  } catch (err) {
    console.error("TeamLesson create ERROR:", err);
    res.status(500).send({
      message: err.message || "Error creating team–lesson assignment.",
    });
  }
};

// Get all team–lesson mappings (mostly for debugging)
exportsObj.findAll = async (_req, res) => {
  try {
    const data = await TeamLesson.findAll();
    res.send(data);
  } catch (err) {
    console.error("TeamLesson findAll ERROR:", err);
    res.status(500).send({ message: "Error retrieving team–lesson mappings." });
  }
};

// Get all plans (lessons) for a given team
exportsObj.findAllForTeam = async (req, res) => {
  try {
    const data = await TeamLesson.findAll({
      where: { id_team: req.params.id_team },
      include: [
        {
          model: db.lesson,
          as: "lesson",
          attributes: ["id_lesson", "title", "description"],
        },
      ],
    });

    res.send(data);
  } catch (err) {
    console.error("TeamLesson findAllForTeam ERROR:", err);
    res.status(500).send({ message: "Error retrieving plans for team." });
  }
};

// Get all teams for a given plan (lesson)
exportsObj.findAllForLesson = async (req, res) => {
  try {
    const data = await TeamLesson.findAll({
      where: { id_lesson: req.params.id_lesson },
      include: [
        {
          model: db.team,
          as: "team",
          attributes: ["id_team", "name", "description"],
        },
      ],
    });

    res.send(data);
  } catch (err) {
    console.error("TeamLesson findAllForLesson ERROR:", err);
    res.status(500).send({ message: "Error retrieving teams for lesson." });
  }
};

// Delete a team–lesson mapping (remove plan from team)
exportsObj.delete = async (req, res) => {
  const { id_team, id_lesson } = req.params;

  try {
    const num = await TeamLesson.destroy({
      where: { id_team, id_lesson },
    });

    if (num === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "Team–lesson assignment not found.",
      });
    }
  } catch (err) {
    console.error("TeamLesson delete ERROR:", err);
    res.status(500).send({
      message: err.message || "Error deleting team–lesson assignment.",
    });
  }
};

export default exportsObj;
