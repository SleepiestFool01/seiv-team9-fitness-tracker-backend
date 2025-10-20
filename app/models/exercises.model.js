import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercises", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reps: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sets: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

export default Exercise;