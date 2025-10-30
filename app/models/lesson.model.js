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
  id_Catalog: {
     type: Sequelize.INTEGER,
     allowNull: false,
  },
  //Relates to What type of muscle this lesson works out.
  id_muscle_group : {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  //Lesson Variables
  //add catalog type into a new table with all of these as Rows  
  // catalog_type: {
  //       type: Sequelize.ENUM("chest", "back", "shoulders", "biceps", "triceps", "forearms", "core", "abs", "glutes", "quadriceps", "hamstrings", "calves", "full body", "cardio", "mobility"),
  // },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  // muscleGroup: {
  //   type: Sequelize.ENUM("Upper-Body","Lower-Body","Full-Body")
  // },
  isCompleted: {
    type: Sequelize.BOOLEAN, 
    defailt: false,
  }, //Used to track lesson progress if it is 100% completed then turn boolean to true. 
  
  published: {
    type: Sequelize.BOOLEAN,
  },
  
});

export default Lesson;
