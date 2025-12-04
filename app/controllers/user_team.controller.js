import db from "../models/index.js";

const UserTeam = db.user_team;
const exports = {};

// Create and Save a new user-team membership
exports.create = async (req, res) => {
  const { id_user, id_team } = req.body;

  if (!id_user || !id_team) {
    return res.status(400).send({
      message: "id_user and id_team are required.",
    });
  }

  try {
    // Check if membership already exists
    const exists = await UserTeam.findOne({
      where: { id_user, id_team }
    });

    if (exists) {
      return res.status(200).send({
        message: "Already a member",
        existed: true,
      });
    }

    // Create membership
    const data = await UserTeam.create({ id_user, id_team });
    res.status(201).send(data);

  } catch (err) {
    console.error("UserTeam.create ERROR:", err);
    res.status(500).send({
      message: err.message || "Error creating user-team membership.",
    });
  }
};


// Retrieve all memberships
exports.findAll = (_req, res) => {
  UserTeam.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error retrieving memberships.",
      })
    );
};

// Retrieve ALL teams assigned to a specific user
exports.findAllForUser = async (req, res) => {
  try {
    const data = await UserTeam.findAll({
      where: { id_user: req.params.id_user },
      include: [
        {
          model: db.team,
          as: "team",
          attributes: ["id_team", "name", "description"]
        }
      ]
    });

    res.send(data);
  } catch (err) {
    console.error("findAllForUser ERROR:", err);
    res.status(500).send({ message: "Error retrieving user teams." });
  }
};




// Retrieve ALL athletes assigned to a specific team
exports.findAllForTeam = async (req, res) => {
  try {
    const data = await UserTeam.findAll({
      where: { id_team: req.params.id_team },
      include: [
        {
          model: db.user,
          as: "user",
          attributes: ["id_user", "fName", "lName", "email"]
        },
        {
          model: db.team,
          as: "team",
          attributes: ["id_team", "name", "description"]
        }
      ]
    });

    res.send(data);
  } catch (err) {
    console.error("findAllForTeam ERROR:", err);
    res.status(500).send({ message: "Error retrieving team members." });
  }
};


// Delete membership
exports.delete = (req, res) => {
  const { id_user, id_team } = req.params;

  UserTeam.destroy({ where: { id_user, id_team } })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "Membership not found.",
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error deleting membership.",
      })
    );
};

export default exports;
