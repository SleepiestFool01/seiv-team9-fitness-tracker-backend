//imorts
  import Sequelize from "sequelize";
  import SequelizeInstance from "../config/sequelizeInstance.js";

  console.log("Muscle Group");
  
  const Muscle_Group = sequelizeInstance("muscle_group",{
    //Primary Key 
    id_muscle_group: {
      type: Sequelize.INTEGER, 
      autoIncrement: true, 
      allowNull: false 
    },
    //Foreign Keys 
    id_lesson: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    //Table Variables 
    muscle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  //export the table instance 
  export default Muscle_Group;
