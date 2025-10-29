
import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

  console.log("Users");

const User = SequelizeInstance.define("user", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
