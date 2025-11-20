import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

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
     isCompleted: {
        type: Sequelize.BOOLEAN, 
        defailt: false,
      }, 
  });

export default Exercise;
