import Sequelize from "sequelize";
import SequeliseInstance from "../config/sequelizeInstance.js";


// A team is comprised of different users, and these users/players are assigned to a team by a coach.
const Team = SequeliseInstance.define("team", {
    //Primary Key 
    id_team: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    //Team Variables
    name: {
        type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.STRING,
    },  

});

export default Team;
