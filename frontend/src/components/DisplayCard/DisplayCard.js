import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import displayCardStyles from "./DisplayCard.module.css";
import * as employeeService from "../../services/api.js";

const DisplayCard = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployeeData = () => {
    employeeService.getAllEmployees().then((res) => {
      setEmployees(res.employees);
    });
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div>
      {employees.length > 0 && (
        <Container>
          <Row>
            <Col>First Name</Col>
            <Col>Last Name</Col>
            <Col>Salary</Col>
            <Col></Col>
          </Row>
          <hr></hr>
          {employees.map((employee) => (
            <Row key={employee.id}>
              <Col>{employee.firstName}</Col>
              <Col>{employee.lastName}</Col>
              <Col>{employee.salary}</Col>
              <Col>Edit/Delete</Col>
            </Row>
          ))}
        </Container>
      )}
    </div>
  );
};

export default DisplayCard;
