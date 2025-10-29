import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

//Catalouge stores a list of different Lessons that a user can view at their leisure. 
// Ask North, Ian, Davis, or Griffin how to actually implement this. 
// I want to have a catalogue for specific muscle groups so maybe I can enumerate this like "Biceps", "Quads", "Triceps". etc. 
const Catalouge = SequelizeInstance.define("catlogue", {
    //Primary Keys 
    id_catalouge: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    //Foreign Keys 
    id_user:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_lesson:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    //Catalogue Variables
    catalogue_type: {
        type: Sequelize.ENUM("chest", "back", "shoulders", "biceps", "triceps", "forearms", "core", "abs", "glutes", "quadriceps", "hamstrings", "calves", "full body", "cardio", "mobility"),
    },

});
export default Catalouge;