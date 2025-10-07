import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Tracker = SequelizeInstance.define("tracker", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
   
export default Tracker;
