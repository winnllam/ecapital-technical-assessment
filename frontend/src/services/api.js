import { get, post, patch, destory } from "./base.js";

const URL = "/employees";

export const getAllEmployees = function () {
  return get(URL).then((res) => res.data);
};

export const addEmployee = function (firstName, lastName, salary) {
  return post(URL, {
    firstName: firstName,
    lastName: lastName,
    salary: salary,
  }).then((res) => res.data);
};

export const updateEmployee = function (
  employeeId,
  firstName,
  lastName,
  salary
) {
  return patch(URL + `/${employeeId}`, {
    firstName: firstName,
    lastName: lastName,
    salary: salary,
  }).then((res) => res.data);
};

export const deleteEmployee = function (employeeId) {
  return destory(URL + `/${employeeId}`);
};
