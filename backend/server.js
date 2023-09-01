import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";
import { sequelize } from "./datasource.js";
import { Employee } from "./models/employee.js";
import jsonData from "../data.json" assert { type: "json" };

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  const isDatabaseExists = fs.existsSync("employees.sqlite");

  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");

  if (!isDatabaseExists) {
    jsonData.employees.forEach((row) => {
      Employee.create({
        firstName: row.firstName,
        lastName: row.lastName,
        salary: row.salary,
      });
    });
  }
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/api/employees", async (req, res, next) => {
  const page = parseInt(req.query.page ?? 0);
  const limit = parseInt(req.query.limit ?? 10);

  const length = await Employee.count();
  const employees = await Employee.findAll({
    order: [["id", "DESC"]],
    offset: page * limit,
    limit: limit,
  });

  return res.json({
    total: length,
    employees: employees,
  });
});

app.post("/api/employees", async (req, res, next) => {
  if (
    typeof req.body.firstName != "string" ||
    req.body.firstName.length == 0 ||
    typeof req.body.lastName != "string" ||
    req.body.lastName.length == 0 ||
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

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id);
  if (employee === null) {
    return res
      .status(404)
      .json({ error: "employee id:" + req.params.id + " does not exists" });
  }

  if (
    typeof req.body.firstName != "string" ||
    req.body.firstName.length == 0 ||
    typeof req.body.lastName != "string" ||
    req.body.lastName.length == 0 ||
    typeof req.body.salary != "number"
  ) {
    return res.status(422).json({
      error:
        "invalid arguments for firstName, lastName, or salary, make sure they are the correct type",
    });
  }

  employee.firstName = req.body.firstName;
  employee.lastName = req.body.lastName;
  employee.salary = req.body.salary;

  employee.save();
  return res.json(employee);
});

app.delete("/api/employees/:id", async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) {
    return res
      .status(404)
      .json({ error: "employee id:" + req.params.id + " does not exists" });
  }

  await employee.destroy();
  return res.json(employee);
});

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
