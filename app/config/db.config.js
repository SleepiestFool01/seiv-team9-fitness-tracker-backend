import 'dotenv/config';

const db_host = process.env.AWS_DB_HOST;
const db_pw = process.env.AWS_DB_PW;
const db_user = process.env.AWS_DB_USER;
const db_name = process.env.AWS_DB_NAME;

const dbConfig = {
  HOST: db_host,
  USER: db_user,
  PASSWORD: db_pw,
  DB: db_name,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, 
    idle: 10000,
  },
};

export default dbConfig;
