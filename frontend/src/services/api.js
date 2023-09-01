import { get, post, patch, destroy } from "./base.js";

const URL = "/employees";

export const getAllEmployees = function (page = 0, limit = 100) {
  return get(URL + `?page=${page}&limit=${limit}`).then((res) => res.data);
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
  return destroy(URL + `/${employeeId}`);
};
