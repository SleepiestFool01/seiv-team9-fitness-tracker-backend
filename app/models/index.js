import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;

// foreign key for session
db.user.hasMany(db.session, {
  as: "sessions",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign key for tutorials
db.user.hasMany(db.tutorial, {
  as: "tutorials",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
db.tutorial.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

export default db;
