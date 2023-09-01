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
  const [editingEmp, setEditingEmp] = useState(null);

  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState("");

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
    employeeService
      .addEmployee(firstName, lastName, salaryParse)
      .then(() => {
        resetInput();
        setShowCreateModal(false);
        fetchEmployeeData();
      })
      .catch((error) => alert("Please enter correct values!"));
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    let salaryParse = parseInt(salary);
    employeeService
      .updateEmployee(id, firstName, lastName, salaryParse)
      .then(() => {
        resetInput();
        setShowEditModal(false);
        fetchEmployeeData();
      })
      .catch((error) => alert("Please enter correct values!"));
  };

  const editEmployee = (employee) => {
    setEditingEmp(employee);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    resetInput();
  };

  const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const resetInput = () => {
    setEditingEmp(null);
    setId(0);
    setFirstName("");
    setLastName("");
    setSalary("");
  };

  useEffect(() => {
    fetchEmployeeData();

    if (editingEmp) {
      setId(editingEmp.id);
      setFirstName(editingEmp.firstName);
      setLastName(editingEmp.lastName);
      setSalary(editingEmp.salary);
    }
  }, [editingEmp]);

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
          <div className={displayCardStyles.employeeList}>
            {employees.map((employee) => (
              <Row key={employee.id}>
                <Col>{employee.firstName}</Col>
                <Col>{employee.lastName}</Col>
                <Col>{currencyFormat(employee.salary)}</Col>
                <Col>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => editEmployee(employee)}
                        className={displayCardStyles.editButton}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => deleteEmployee(employee.id)}
                        className={displayCardStyles.deleteButton}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
          </div>
        )}
        {employees.length === 0 && <p>No employees to show!</p>}
        <hr></hr>
        <Button
          className={displayCardStyles.button}
          onClick={() => setShowCreateModal(true)}
        >
          Add Employee
        </Button>

        <FormModal
          show={showCreateModal}
          close={() => closeModal()}
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
          close={() => closeModal()}
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
