import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./datasource.js";
import { Employee } from "./models/employee.js";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/api/employees", async (req, res, next) => {
  const length = await Employee.count();
  const employees = await Employee.findAll();

  return res.json({
    total: length,
    employees: employees,
  });
});

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
