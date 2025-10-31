import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";


const User_Metric = SequelizeInstance.define("user_metric", {
  //Primary Key
  id_user_metric: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //Foreign Keys
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  //Timestamp for this measurement
  recorded_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },

  //Measurements
  weight_kg: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  height_cm: {
    type: Sequelize.DECIMAL(5, 2),
    allowNull: true,
  },
  mile_time_min: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  bench_press_lb: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  squat_lb: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  deadlift_lb: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  notes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default User_Metric;
