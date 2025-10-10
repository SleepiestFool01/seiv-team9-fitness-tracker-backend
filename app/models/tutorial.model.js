import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Tutorial = SequelizeInstance.define("tutorial", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  published: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Tutorial;
