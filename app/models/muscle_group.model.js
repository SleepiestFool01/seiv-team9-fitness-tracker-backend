//imorts
import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";



const Muscle_Group = SequelizeInstance.define("muscle_group", {
  //Primary Key 
  id_muscle_group: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //Table Variables 
  muscle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//export the table instance 
export default Muscle_Group;
