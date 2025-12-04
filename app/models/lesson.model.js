import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";


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
    allowNull: true, // optional: creator/owner, but not required to assign lesson
  },
  //Relates to what type of muscle this lesson works out.
  id_muscle_group: {
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
  isCompleted: {
    type: Sequelize.BOOLEAN, 
    defaultValue: false,
  }, //Used to track lesson progress if it is 100% completed then turn boolean to true. 
  
  published: {
    type: Sequelize.BOOLEAN,
  },
  
});

export default Lesson;
