/*
index.js in Models is how we can relate each table within the database to one another. 
Create foreign keys within each table, first you have to import each "Entity" or table into the Index file, 
then assign each as a constant within the database.
*/

//CATALOG RELATIONS - I dont think it needs anu relations because it is a bridge table

//USER TEAM BRIDGE TABLE RELATIONS - I dont think it needs anu relations because it is a bridge table
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Import the models of each table into index. 
import User from "./user.model.js";
import Session from "./session.model.js";
import Lesson from "./lesson.model.js";
import Exercise from "./exercise.model.js";
import Player_Goal from "./player_goal.model.js";
import Team_Goal from "./team_goal.model.js";
import Player_Goal_Progress from "./player_goal_progress.model.js";
import Team_Goal_Progress from "./team_goal_progress.model.js";
import Catalog from "./catalog.model.js";
import User_Team from "./user_team.model.js";
import Team from "./team.model.js";
import Muscle_Group from "./muscle_group.model.js";
import User_Metric from "./user_metric.model.js";
import Team_Lesson from "./team_lesson.model.js";
import User_Lesson from "./user_lesson.model.js";


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.lesson = Lesson;
db.exercise = Exercise;
db.player_goal = Player_Goal;
db.player_goal_progress = Player_Goal_Progress;
db.team_goal = Team_Goal;
db.team_goal_progress = Team_Goal_Progress;
db.catalog = Catalog;
db.user_team = User_Team;
db.team = Team;
db.team_lesson = Team_Lesson;
db.muscle_group = Muscle_Group;
db.user_metric = User_Metric;
db.user_lesson = User_Lesson;

// =============================
// TEAM ↔ USER_TEAM association
// =============================

// Team can have many user_team rows
db.team.hasMany(db.user_team, {
  foreignKey: "id_team",
  as: "user_team_entries"
});
db.user_team.belongsTo(db.team, {
  foreignKey: "id_team",
  as: "team"
});

// =============================
// USER ↔ USER_TEAM association
// =============================

// User can have many user_team rows
db.user.hasMany(db.user_team, {
  foreignKey: "id_user",
  as: "user_team_entries"
});
db.user_team.belongsTo(db.user, {
  foreignKey: "id_user",
  as: "user"
});

// TEAM ↔ LESSON (Exercise Plans) RELATIONS
db.team.belongsToMany(db.lesson, {
  through: db.team_lesson,
  foreignKey: "id_team",
  otherKey: "id_lesson",
  as: "plans",          // team.plans
});

db.lesson.belongsToMany(db.team, {
  through: db.team_lesson,
  foreignKey: "id_lesson",
  otherKey: "id_team",
  as: "teams",          // lesson.teams
});

db.team_lesson.belongsTo(db.team, {
  foreignKey: "id_team",
  as: "team",
});

db.team_lesson.belongsTo(db.lesson, {
  foreignKey: "id_lesson",
  as: "lesson",
});

// USER ↔ LESSON (Assigned Workouts) RELATIONS
db.user.belongsToMany(db.lesson, {
  through: db.user_lesson,
  foreignKey: "id_user",
  otherKey: "id_lesson",
  as: "assigned_lessons",
});

db.lesson.belongsToMany(db.user, {
  through: db.user_lesson,
  foreignKey: "id_lesson",
  otherKey: "id_user",
  as: "assigned_users",
});

db.user_lesson.belongsTo(db.user, {
  foreignKey: "id_user",
  as: "user",
});

db.user_lesson.belongsTo(db.lesson, {
  foreignKey: "id_lesson",
  as: "lesson",
});


//For Catalog lessons belong to many users & Users belong to many lessons for the relations 
//Do the same thing for the user_team bridge table. 

//USER RELATIONS 
db.user.hasMany(db.session, {
  as: "sessions",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});
db.user.hasMany(db.lesson, {
  as: "lessons",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});
db.user.hasMany(db.player_goal, {
  as: "player_goal", 
  foreignKey: {name: "id_user", allowNull: false }, 
  onDelete: "CASCADE", 
});
db.user.belongsToMany(db.team, {
  through: db.user_team,
  foreignKey: "id_user",
  otherKey: "id_team",
  as: "teams",
});

//SESSION RELATIONS 
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});

//LESSON RELATIONS 
db.lesson.hasMany(db.exercise, {
  as: "exercises",
  foreignKey: { name: "id_lesson", allowNull: false },
  onDelete: "CASCADE",
});
db.lesson.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});

db.muscle_group.hasMany(db.lesson, {
  as: "lessons",
  foreignKey: { name: "id_muscle_group", allowNull: false },
  onDelete: "RESTRICT",
});

db.lesson.belongsTo(db.muscle_group, {
  as: "muscle_group",
  foreignKey: { name: "id_muscle_group", allowNull: false },
  onDelete: "RESTRICT",
});

//EXERCISES RELATIONS 
db.exercise.belongsTo(db.lesson, {
  as: "lesson",
  foreignKey: { name: "id_lesson", allowNull: false },
  onDelete: "CASCADE",
});

//Player_Goal RELATIONS 
db.player_goal.belongsTo(db.user,{
  as: "user",
  foreignKey: {name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});

db.player_goal.hasMany(db.player_goal_progress, {
  as: "progress_entries",
  foreignKey: { name: "id_player_goal", allowNull: false },
  onDelete: "CASCADE",
});

db.player_goal_progress.belongsTo(db.player_goal, {
  as: "goal",
  foreignKey: { name: "id_player_goal", allowNull: false },
  onDelete: "CASCADE",
});

db.player_goal_progress.belongsTo(db.user_metric, {
  as: "metric_snapshot",
  foreignKey: { name: "id_user_metric", allowNull: true },
  onDelete: "SET NULL",
});


//TEAM GOAL RELATIONS 
db.team_goal.belongsTo(db.team, {
  as: "team", 
  foreignKey: {name: "id_team", allowNull: true},
  onDelete: "CASCADE", 
}),

db.team_goal.hasMany(db.team_goal_progress, {
  as: "progress_entries",
  foreignKey: { name: "id_team_goal", allowNull: false },
  onDelete: "CASCADE",
});

db.team_goal_progress.belongsTo(db.team_goal, {
  as: "goal",
  foreignKey: { name: "id_team_goal", allowNull: false },
  onDelete: "CASCADE",
});

db.team.belongsToMany(db.user, {
  through: db.user_team,
  foreignKey: "id_team",
  otherKey: "id_user",
  as: "members",
});

//USER METRIC RELATIONS
db.user.hasMany(db.user_metric, {
  as: "metrics",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});

db.user_metric.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "id_user", allowNull: false },
  onDelete: "CASCADE",
});

export default db;



