import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Team_Lesson = SequelizeInstance.define("team_lesson", {
  id_team: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_lesson: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});

export default Team_Lesson;
