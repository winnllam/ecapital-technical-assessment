import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import displayCardStyles from "./DisplayCard.module.css";
import * as employeeService from "../../services/api.js";
import FormModal from "../FormModal/FormModal";

const DisplayCard = () => {
  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState(0);

  const fetchEmployeeData = () => {
    employeeService.getAllEmployees().then((res) => {
      setEmployees(res.employees);
    });
  };

  const deleteEmployee = (id) => {
    employeeService.deleteEmployee(id).then(() => {
      fetchEmployeeData();
    });
  };

  const createEmployee = (e) => {
    e.preventDefault();
    let salaryParse = parseInt(salary);
    if (!isNaN(salaryParse)) {
      employeeService.addEmployee(firstName, lastName, salaryParse).then(() => {
        resetInput();
        setShowCreateModal(false);
        fetchEmployeeData();
      });
    } else {
      alert("Please enter a number for salary!");
    }
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    if (!isNaN(salary)) {
      employeeService
        .updateEmployee(id, firstName, lastName, salary)
        .then(() => {
          resetInput();
          setShowEditModal(false);
          fetchEmployeeData();
        });
    } else {
      alert("Please enter a number for salary!");
    }
  };

  const editEmployee = (employee) => {
    setEditingUser(employee);
    setShowEditModal(true);
  };

  const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const resetInput = () => {
    setEditingUser(null);
    setId(0);
    setFirstName("");
    setLastName("");
    setSalary(0);
  };

  useEffect(() => {
    fetchEmployeeData();

    if (editingUser) {
      setId(editingUser.id);
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setSalary(editingUser.salary);
    }
  }, [editingUser]);

  return (
    <div className={displayCardStyles.displayCard}>
      <Container>
        <h3 className={displayCardStyles.header}>Employees</h3>
        <Row>
          <Col>
            <b>First Name</b>
          </Col>
          <Col>
            <b>Last Name</b>
          </Col>
          <Col>
            <b>Salary</b>
          </Col>
          <Col></Col>
        </Row>
        <hr></hr>
        {employees.length > 0 && (
          <div>
            {employees.map((employee) => (
              <Row key={employee.id}>
                <Col>{employee.firstName}</Col>
                <Col>{employee.lastName}</Col>
                <Col>{currencyFormat(employee.salary)}</Col>
                <Col>
                  <div className={displayCardStyles.editDelete}>
                    <p
                      onClick={() => editEmployee(employee)}
                      className={displayCardStyles.edit}
                    >
                      Edit
                    </p>
                    <p
                      onClick={() => deleteEmployee(employee.id)}
                      className={displayCardStyles.delete}
                    >
                      Delete
                    </p>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        )}
        <Button
          className={displayCardStyles.button}
          onClick={() => setShowCreateModal(true)}
        >
          Add Employee
        </Button>

        <FormModal
          show={showCreateModal}
          close={() => setShowCreateModal(false)}
          action="Add"
          handleSubmit={createEmployee}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          salary={salary}
          setSalary={setSalary}
        ></FormModal>

        <FormModal
          show={showEditModal}
          close={() => setShowEditModal(false)}
          action="Edit"
          handleSubmit={updateEmployee}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          salary={salary}
          setSalary={setSalary}
        ></FormModal>
      </Container>
    </div>
  );
};

export default DisplayCard;
