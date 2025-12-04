
import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const User = SequelizeInstance.define("user", {
  //Primary Key 
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //User Variables Changes players to athletes
  role: {
    type: Sequelize.ENUM("athletes", "coach", "admin"),
    defaultValue: "athletes",
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
  bio: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: "Share your goals, experience, or anything your coach should know.",
  },

});

export default User;
