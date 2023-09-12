import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Employee = sequelize.define("Employee", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
