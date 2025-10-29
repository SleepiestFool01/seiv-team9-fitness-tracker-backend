import Sequelize from "sequelize";
import SequeliseInstance from "../config/sequelizeInstance.js";

console.log("teams");

// A team is comprised of different users, and these users/players are assigned to a team by a coach.
const Team = SequeliseInstance.define("team", {
    //Primary Key 
    id_team: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    //Foreign Keys 
    id_user_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    //Team Variables
    name: {
        type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.STRING,
    },  
    /*
    I want to add functionality for the Number of Team members to ve stored here.
    I also want to ad 
    */


});

export default Team;