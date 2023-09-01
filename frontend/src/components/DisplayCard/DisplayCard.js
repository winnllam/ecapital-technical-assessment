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

  const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

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
                    <p className={displayCardStyles.edit}>Edit</p>
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
        <Button variant="primary" onClick={() => setShowEditModal(true)}>
          Add Employee
        </Button>
        <FormModal
          show={showEditModal}
          close={() => setShowEditModal(false)}
          firstName=""
          lastName=""
          salary=""
        />
      </Container>
    </div>
  );
};

export default DisplayCard;
