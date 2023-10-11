import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/fetch';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header'
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState(sessionStorage.getItem('email') || '');

  const [password, setPassword] = useState(sessionStorage.getItem('password') || '');

  const { fetch } = useFetch();

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    if(email && password) {
      handleLogin()
    }
    // setting cartitems storage as we are using this in useEffect
    // inside Header component
    sessionStorage.setItem('cartItems', JSON.stringify([]))
  }, [])

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPassword(value);
  };

  const handleLogin = async () => {
    let response: any = await fetch('/login', 'POST', {
      email,
      password,
    });
    if (response.ok) {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password)
      response = await response.json();
      const courses = response.data;
      navigate('/landing', { state: { courses } });
    } else {
      setErrorMessage(response.errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    await fetch('/forgotpassword', 'GET');
  };

  return (
    <>
      <Header/>
      {pathname === '/' || pathname === '/login' ? (
        <div className='course-login-form'>
          <p>{errorMessage}</p>
          <div className='course-login-form-inputs-wrapper'>
            <Input
              className='course-login-form-email-input'
              placeholder='email'
              value={email}
              onChange={handleEmail}
            />
            <Input
              className='course-login-form-password-input'
              placeholder='password'
              value={password}
              onChange={handlePassword}
            />
            <Button
              className='course-login-form-login-link'
              onClick={handleLogin}
              text="Login"
            />
          </div>
          <div className='course-login-form-links-wrapper'>
            <Button
              className='course-login-form-forgotpassword-link'
              onClick={handleForgotPassword}
              text="Forgot Password"
            />
            <Link className='course-login-form-register-link' to='/register'>Register</Link>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Login;
