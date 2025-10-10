import express from "express";
import cors from "cors";

import routes from "./app/routes/index.js";
import db from "./app/models/index.js";

try {
  await db.sequelize.sync();
  console.log("Database synchronized successfully.");
} catch (err) {
  console.error("Failed to synchronize database:", err);
  process.exit(1);
}

const app = express();

// Also use the cors middleware as backup
const corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to bezkoder application.",
  });
});

// Load the routes from the routes folder
app.use("/tutorial", routes);

// set port, listen for requests
const PORT = process.env.PORT || 3100;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

export default app;
