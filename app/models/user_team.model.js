import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const User_Team = SequelizeInstance.define("user_team", {
  //Foreign Keys / Composite key 
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_team: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    primaryKey: true,
  },
});

export default User_Team;
