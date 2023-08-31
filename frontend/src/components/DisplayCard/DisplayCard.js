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

  const deleteEmployee = (id) => {
    employeeService.deleteEmployee(id).then(() => {
      fetchEmployeeData();
    });
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <Container>
      <Row>
        <Col>First Name</Col>
        <Col>Last Name</Col>
        <Col>Salary</Col>
        <Col></Col>
      </Row>
      <hr></hr>
      {employees.length > 0 && (
        <div>
          {employees.map((employee) => (
            <Row key={employee.id}>
              <Col>{employee.firstName}</Col>
              <Col>{employee.lastName}</Col>
              <Col>{employee.salary}</Col>
              <Col>
                <div className={displayCardStyles.editDelete}>
                  <p>Edit</p>
                  <p onClick={() => deleteEmployee(employee.id)}>Delete</p>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </Container>
  );
};

export default DisplayCard;
