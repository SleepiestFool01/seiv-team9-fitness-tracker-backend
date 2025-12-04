import Sequelize from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

const Team = sequelize.define("team", {
  id_team: {
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
    allowNull: true,
  },
});

export default Team;
