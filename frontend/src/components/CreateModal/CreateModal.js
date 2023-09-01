import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as employeeService from "../../services/api.js";

const CreateModal = (props) => {
  const initialFormState = { firstName: "", lastName: "", salary: "" };
  const [employee, setEmployee] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    let salary = parseInt(employee.salary);
    if (!isNaN(salary)) {
      employeeService
        .addEmployee(employee.firstName, employee.lastName, salary)
        .then((res) => {});
    } else {
      alert("Please enter a number for salary!");
      e.preventDefault();
    }
  };

  const closeForm = () => {
    setEmployee(initialFormState);
    props.close();
  };

  return (
    <>
      <Modal show={props.show} centered>
        <Modal.Header>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={employee.firstName}
                onChange={handleInputChange}
                placeholder="ex. Jane"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={employee.lastName}
                onChange={handleInputChange}
                placeholder="ex. Doe"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Salary</Form.Label>
              <Form.Control
                name="salary"
                value={employee.salary}
                onChange={handleInputChange}
                placeholder="ex. 80000"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Employee
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;
