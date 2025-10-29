/*
index.js in Models is how we can relate each table within the database to one another. 
Create foreign keys within each table, first you have to import each "Entity" or table into the Index file, 
then assign each as a constant within the database.
*/

import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Import the models of each table into index. 
import User from "./user.model.js";
import Session from "./session.model.js";
import Lesson from "./lesson.model.js";
import Exercise from "./exercise.model.js";
import Player_Goal from "./player_goal.model.js";
import Team_Goal from "./team_goal.model.js";
import Catalog from "./catalog.model.js";
import User_Team from "./user_team.model.js";
import Team from "./team.model.js";

console.log("index.js");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.lesson = Lesson;
db.exercise = Exercise;
db.player_goal = Player_Goal;
db.team_goal = Team_Goal;
db.catalog = Catalog;
db.user_team = User_Team;
db.team = Team;

//USER RELATIONS 
db.user.hasMany

//SESSION RELATIONS 
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

//LESSON RELATIONS 
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

//EXERCISES RELATIONS 
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

//Player_Goal RELATIONS 
db.user.hasMany(db.player_goal, {
  as: "player_goal", 
  foreignKey: {name: "id_user", allowNull: false }, 
  onDelete: "CASCADE", 
})
db.player_goal.belongsTo(db.user,{
  as: "user",
  foreignKey: {name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});
export default db;

//TEAM GOAL RELATIONS 

//CATALOG RELATIONS 

//USER TEAM BRIDGE TABLE RELATIONS 

//TEAM RELATIONS 
