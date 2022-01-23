import React, { useContext, useEffect } from "react";
import UserForm from "./userForm";
import UserContext from "../../../context/users/userContext";

import { DropdownButton, Dropdown } from "react-bootstrap";

const User = () => {
  const userContext = useContext(UserContext);
  const { users, updateUser, deleteUser, getUsers } = userContext;
  useEffect(() => {
    getUsers();
  }, []);
  //handleDelet waterTower
  const handleDelete = (id) => {
    deleteUser(id);
  };
  //handleUpdate waterTower
  const handleUpdate = (user) => {
    const newRole = user.role === "admin" ? "normal" : "admin";
    const id = user._id;
    updateUser({ id, newRole });
  };
  return (
    <div className='container'>
      {/* Banner */}
      <div
        className='row col-lg-12'
        style={{
          textAlign: "center",
        }}
      >
        <div className='alert alert-primary' role='alert' key='b25'>
          <h3 className='h3'>Users</h3>
        </div>
      </div>
      {/* form */}
      <div className=' col-lg-12' style={{ height: 40 }}>
        <UserForm />
      </div>
      {/* table of users */}
      <div className=' col-lg-12 mt-4' style={{ marginTop: 14 }}>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Status</th>
              <th scope='col'>Last Seen</th>
              <th scope='col'>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.status === "online" ? (
                      <span className='badge rounded-pill bg-success'>
                        {user.status}
                      </span>
                    ) : (
                      <span className='badge rounded-pill bg-secondary'>
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {user.status === "online" ? (
                      user.lastSeen
                    ) : (
                      <span>
                        {user.lastSeen.slice(0, 16).split("T")[0]}
                        <br></br>
                        {user.lastSeen.slice(0, 16).split("T")[1]}
                      </span>
                    )}
                  </td>
                  <td>{user.date.split("T")[0]}</td>
                  <td>
                    <DropdownButton
                      id='dropdown-basic-button'
                      title='More'
                      size='sm'
                    >
                      <Dropdown.Item onClick={() => handleUpdate(user)}>
                        {user.role === "admin" ? "Set normal" : "Set admin"}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(user._id)}>
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
