
import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  console.log("Users");

//A Coach should be able to assign a Lesson or exercise to a player directly, 
//A Player should be able to assign Exercises to their own goals *Goals r owned by the players not the coaches. 
const User = SequelizeInstance.define("user", {
  //Primary Key 
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //Foreign Keys 
  id_session: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_Catalogue: { 
    type: Sequelize.INTEGER, 
    allowNull: false,
  },
  id_goal: {
    type: Sequelize.INTEGER,
    allowNull: true, 
  },
  id_lesson: {
    type: Sequelize.INTEGER, 
    allowNull: false,
  },
  id_user_team:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  

  //User Variables
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
   role: { 
    type: Sequelize.ENUM("player", "coach", "admin"),
    defaultValue: "player" 
  },
  created_at: { 
    type: Sequelize.DATE, 
    defaultValue: Sequelize.NOW 
  },

  // refresh_token: {
  //   type: Sequelize.STRING(512),
  //   allowNull: true
  // },
  // expiration_date: {
  //   type: Sequelize.DATE,
  //   allowNull: true
  // },
});

export default User;
