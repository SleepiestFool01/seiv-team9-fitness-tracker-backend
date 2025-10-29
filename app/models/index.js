/*
index.js in Models is how we can relate each table within the database to one another. 
Create foreign keys within each table, first you have to import each "Entity" or table into the Index file, 
then assign each as a constant within the database.
*/

import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models
import User from "./user.model.js";
import Session from "./session.model.js";
import Lesson from "./lesson.model.js";
import Exercise from "./exercise.model.js";

console.log("index.js");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.lesson = Lesson;
db.exercise = Exercise;

// foreign key for sessions
db.user.hasMany(db.session, {
  as: "sessions",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});

// foreign key for lessons
db.user.hasMany(db.lesson, {
  as: "lessons",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});
db.lesson.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});

// foreign key for exercises
db.lesson.hasMany(db.exercise, {
  as: "exercises",
  foreignKey: { name: "id_lesson", allowNull: false },
  onDelete: "CASCADE",
});
db.exercise.belongsTo(db.lesson, {
  as: "lesson",
  foreignKey: { name: "id_lesson", allowNull: false },
  onDelete: "CASCADE",
});

export default db;
