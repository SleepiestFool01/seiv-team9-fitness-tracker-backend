import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Player_Goal_Progress = SequelizeInstance.define("player_goal_progress", {
  //Primary Key
  id_player_goal_progress: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  //Foreign Keys
  id_player_goal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  //optional tie to metrics table so we can reuse recorded data
  id_user_metric: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  //Timestamp
  recorded_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },

  //Actual performance for this attempt
  actual_time: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  actual_reps: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  actual_weight: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  notes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Player_Goal_Progress;
