import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

console.log("Exercises");

const Exercise = SequelizeInstance.define("exercise", {
  id_exercise: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  published: {
    type: Sequelize.BOOLEAN,
  },
  id_lesson: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Exercise;
