import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/users/userContext";
import toast from "react-hot-toast";

const UserForm = () => {
  const userContext = useContext(UserContext);
  const { current, addUser, updateUser, getUsers } = userContext;
  const [user, setUser] = useState({
    id: v4(),
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const { name, email, password, role } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      password.trim === "" ||
      email.trim === "" ||
      role.trim() === ""
    ) {
      toast.error("Please fill out all fields");
    } else {
      if (current === null) {
        addUser(user);
      } else {
        updateUser(user);
      }
    }
  };

  useEffect(() => {
    if (current !== null) {
      setUser({ ...current });
    } else {
      setUser({
        id: v4(),
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
  }, [current, userContext]);
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-group mt-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Username'
          name='name'
          value={name}
          onChange={handleChange}
          required
        />
        <span className='input-group-text'>
          <i className='fas fa-user-circle'></i>
        </span>
        <input
          type='email'
          className='form-control'
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleChange}
          required
        />
        <span className='input-group-text'>
          <i className='fas fa-envelope'></i>
        </span>
        <input
          type='password'
          className='form-control'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleChange}
          required
        />
        <span className='input-group-text'>
          <i className='fas fa-unlock'></i>
        </span>

        <select
          className='form-select'
          name='role'
          value={role}
          onChange={handleChange}
          required
        >
          <option defaultValue value=''>
            Role...
          </option>
          <option value='admin'>Admin</option>
          <option value='normal'>Normal</option>
        </select>
        <button type='submit' className='btn btn-primary'>
          {current ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;

const v4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
