import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

//Catalouge stores a list of different Lessons that a user can view at their leisure. 
// Ask North, Ian, Davis, or Griffin how to actually implement this. 
// I want to have a catalogue for specific muscle groups so maybe I can enumerate this like "Biceps", "Quads", "Triceps". etc. 

//Don't make the mistake of misspelling catalog again!!! save your self sometime Teagan!!!!
console.log("Catalog model");
//essentially a bridge table now
const Catalog = SequelizeInstance.define("catalog", {
    //Primary Keys 
    // id_catalog: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    // },

    //Foreign Keys / composite primary key 
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,

    },
    id_lesson: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },

});
export default Catalog;