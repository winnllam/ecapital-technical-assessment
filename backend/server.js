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

app.post("/api/employees", async (req, res, next) => {
  if (
    typeof req.body.firstName != "string" ||
    typeof req.body.lastName != "string" ||
    typeof req.body.salary != "number"
  ) {
    return res.status(422).json({
      error:
        "invalid arguments for firstName, lastName, or salary, make sure they are the correct type",
    });
  }

  const employee = await Employee.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    salary: req.body.salary,
  });

  return res.json(employee);
});

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
