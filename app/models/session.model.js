import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

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
  //
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  //Session Variables 
  token: {
    type: Sequelize.STRING(3000),
    allowNull: false,
  },
  expirationDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

export default Session;
