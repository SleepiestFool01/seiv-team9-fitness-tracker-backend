import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

console.log("sessions");

const Session = SequelizeInstance.define("session", {
  id_session: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Session;
