import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  console.log("User-Team Bridge Table");

//Brideg Table between User & Team

const User_Team = SequelizeInstance.define("user_team", {
  //Primary Key 
  id_user_team: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //Foreign Keys 
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_team: {
    type: Sequelize.INTEGER,
    allowNull: false, 
  },

});

export default User_Team;
