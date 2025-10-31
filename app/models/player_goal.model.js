import Sequelize from  "sequelize"; //Used to define the types of a variable within a table
import SequelizeInstance from "../config/sequelizeInstance.js";// Used to define the table within the database


const Player_Goal = SequelizeInstance.define("player_goal", {
    //Primary Key
    id_player_goal:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    //Foreign Keys 
    id_user:{
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
    playerTime:{
        type: Sequelize.FLOAT,
    },
    playerReps:{
        type: Sequelize.INTEGER,
    },
});

export default Player_Goal;





