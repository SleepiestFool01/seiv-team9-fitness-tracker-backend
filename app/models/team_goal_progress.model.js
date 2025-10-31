import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";


const Team_Goal_Progress = SequelizeInstance.define("team_goal_progress", {
  //Primary Key
  id_team_goal_progress: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  //Foreign Keys
  id_team_goal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  //Timestamp
  recorded_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },

  //Aggregated/summary performance
  avg_time: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  avg_weight: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  avg_reps: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  sample_size: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  notes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Team_Goal_Progress;
