import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../../context/auth/authContext";
import logo from "./logo.png";
const Login = (props) => {
  // init auth context
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Password can't be empty");
    } else {
      login(user);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated]);
  return (
    <div className='text-center col-lg-4 mx-auto'>
      <form className='form-signin' onSubmit={onSubmit}>
        <img className='mb-3' src={logo} alt='' width='250' height='400' />
        <h1 className='h1 mb-3 font-weight-normal'>
          Log<span className='text-primary'>in</span>
        </h1>

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
          id='inputPassword'
          className='form-control my-3'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          name='password'
        />
        <button className='btn btn-lg btn-primary btn-block mt-4' type='submit'>
          Login
        </button>
        <p className='mt-5 mb-3 text-muted'>
          &copy; {new Date().getFullYear()}-{new Date().getFullYear() + 1}
        </p>
      </form>
    </div>
  );
};

export default Login;
