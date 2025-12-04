import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const User_Lesson = SequelizeInstance.define("user_lesson", {
  id_user_lesson: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_lesson: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default User_Lesson;
