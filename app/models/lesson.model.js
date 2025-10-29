import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

//A Lesson is a collection of Exercises
console.log("Lesson's");

const Lesson = SequelizeInstance.define("lesson", {
  //Primary Key 
  id_lesson: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //Foreign Keys 
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_Catalogue: {
     type: Sequelize.INTEGER,
     allowNull: false,
  },

  //Lesson Variables
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  muscleGroup: {
    type: Sequelize.ENUM("Upper-Body","Lower-Body","Full-Body")
  },
  
  published: {
    type: Sequelize.BOOLEAN,
  },
  
});

export default Lesson;
