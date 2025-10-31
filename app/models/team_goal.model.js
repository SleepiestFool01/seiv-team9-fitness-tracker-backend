import Sequelize from  "sequelize"; //Used to define the types of a variable within a table
import SequelizeInstance from "../config/sequelizeInstance.js";// Used to define the table within the database


const Team_Goal = SequelizeInstance.define("team_goal", {
    //Primary Key
    id_team_goal:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    //Foreign Keys 
    id_team:{
        type: Sequelize.INTEGER,
        allowNull: false, 
    }, 

    id_exercise:{
        type: Sequelize.INTEGER, 
        allowNull: false, 
    },
    
    //Goal variables 
    title:{
        type: Sequelize.STRING,
    },

    description:{
        type: Sequelize.STRING, 
    },

    avgTime:{
        type: Sequelize.FLOAT, 
    },
    avgWeight:{
        type: Sequelize.FLOAT,
    },
    
});

export default Team_Goal;





