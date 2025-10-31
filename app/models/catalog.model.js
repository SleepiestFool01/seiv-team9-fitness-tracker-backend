import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Catalog = SequelizeInstance.define("catalog", {

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