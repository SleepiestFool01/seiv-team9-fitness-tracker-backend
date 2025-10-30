
import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

console.log("Users");

//A Coach should be able to assign a Lesson or exercise to a player directly, 
//A Player should be able to assign Exercises to their own goals *Goals are owned by the players not the coaches. 
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
  id_Catalog: {
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
  id_user_team: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  //User Variables Changes players to athletes
  role: {
    type: Sequelize.ENUM("athletes", "coach", "admin"),
    defaultValue: "player"
  },
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
  weight: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  //Make a new table to record stats below
  //Height is converted to customary system on the front end
  height_cm: {
    type: Sequelize.DataTypes.DECIMAL(5, 2),
    allowNull: true,
    //upper & lower bounds for the height of a user 
    validate: { 
      min: 50,  
      max: 300, 
    },
  },
  mileTime: {
    type: Sequelize.FLOAT,
    allowNull: true,
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