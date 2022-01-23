import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  // init auth context
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated } = authContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [props.history, isAuthenticated]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast.error("Please fill in the name");
    } else if (password !== password2) {
      toast.error("Passwords are not the same");
    } else {
      register({ name, email, password });
    }
  };
  return (
    <div className='text-center col-lg-4 mx-auto'>
      <form className='form-signin' onSubmit={onSubmit}>
        <img
          className='mb-4'
          src='https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg'
          alt=''
          width='72'
          height='72'
        />
        <h1 className='h1 mb-3 font-weight-normal'>
          Account <span className='text-primary'> Register</span>
        </h1>
        <input
          type='text'
          className='form-control'
          placeholder='User Name'
          required
          autoFocus
          value={name}
          onChange={onChange}
          name='name'
        />

        <input
          type='email'
          id='inputEmail'
          className='form-control mt-3'
          placeholder='Email address'
          required
          autoFocus
          value={email}
          onChange={onChange}
          name='email'
        />

        <input
          type='password'
          className='form-control my-3'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          name='password'
          minLength='6'
        />
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Confirm Password'
          required
          value={password2}
          onChange={onChange}
          name='password2'
          minLength='6'
        />

        <button className='btn btn-lg btn-primary btn-block mt-4' type='submit'>
          Register
        </button>
        <p className='mt-5 mb-3 text-muted'>&copy; 2021-2022</p>
      </form>
    </div>
  );
};

export default Register;
