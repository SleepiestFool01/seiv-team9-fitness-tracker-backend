import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

console.log("Exercises");

const Exercise = SequelizeInstance.define("exercise", {
  //Primary Key
  id_exercise: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  //Foreign Keys 
  id_lesson: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_goal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  //Exercise Variables
  name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reps: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sets: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

export default Exercise;
