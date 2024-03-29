import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import formModalStyles from "./FormModal.module.css";

const FormModal = ({
  show,
  close,
  action,
  handleSubmit,
  title,
  setTitle,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  salary,
  setSalary,
}) => {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>{action} Employee</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex. Developer"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="ex. Jane"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="ex. Doe"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="ex. 80000"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button className={formModalStyles.button} type="submit">
            {action} Employee
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormModal;
