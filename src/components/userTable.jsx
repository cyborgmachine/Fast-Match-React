import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
// import Users from './users';
import API from "../api/index.js";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const getUsers = await API.users.fetchAll();
      setUsers(getUsers);
    };
    fetchUsers();
  }, []);

  // Visible Table
  const isTableVisible = users.length > 0;

  // Delete User Function
  const remove = (userToRemove) => {
    setUsers(users.filter((user) => user._id !== userToRemove._id));
  };

  // Header User Count Function
  function userQuantity() {
    if (users.length > 1) {
      return (
        <h2 id="header-total">
          <span className="badge bg-primary">
            {users.length} People hanging out with you today
          </span>
        </h2>
      );
    } else if (users.length === 1) {
      return (
        <h2 id="header-total">
          <span className="badge bg-primary">
            {users.length} Person hanging out with you today
          </span>
        </h2>
      );
    } else {
      return (
        <h2 id="header-total">
          <span className="badge bg-danger">
            Nobody hanging out with you today
          </span>
        </h2>
      );
    }
  }

  const listUsers = users.map((user) => (
    <tr id="userLine" key={user._id}>
      <td>{user.name}</td>

      <td className="td-display">
        {user.qualities.map((quality) => (
          <span
            className={"td-text badge rounded-pill text-bg-" + quality.color}
          >
            {quality.name}
          </span>
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} /5</td>

      {/* Delete Button */}
      <td>
        <Button variant="danger" onClick={() => remove(user)}>
          Delete
        </Button>
      </td>
    </tr>
  ));
  return (
    <>
      {userQuantity()}
      <Table
        striped
        bordered
        hover
        style={{ visibility: !isTableVisible ? "hidden" : "visible" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Qualities</th>
            <th>Proffesion</th>
            <th>Met (times)</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{listUsers}</tbody>
      </Table>
    </>
  );
}

export default UserTable;
