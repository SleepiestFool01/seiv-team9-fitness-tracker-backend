import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

console.log("sessions");
//A session contains the current bearer token for a user to be logged into the frontend so they can view the application. 
const Session = SequelizeInstance.define("session", {
  //Primary Key
  id_session: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //Foreign Keys 
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  //Session Variables 
  token: {
    type: Sequelize.STRING(3000),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expirationDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  
});

export default Session;
