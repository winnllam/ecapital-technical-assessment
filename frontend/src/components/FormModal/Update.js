const Update = ({
  handleSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  salary,
  setSalary,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Salary:</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default Update;
