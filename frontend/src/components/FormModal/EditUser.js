// EditUser.js
import React, { useState, useEffect } from "react";

const EditUser = ({ user, onUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Populate the input fields with user data when the user prop changes
    if (user) {
      setName(user.firstName);
      setEmail(user.lastName);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user data and send it to the parent component
    console.log(name);
    onUpdate({ ...user, name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUser;
