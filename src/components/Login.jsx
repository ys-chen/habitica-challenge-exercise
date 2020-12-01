import React, { useState } from 'react';
import Loading from './Loading';
import './Login.css';

function Login({ setIsLogin, setData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState('');
  const handleChange = (e) => { setPassword(e.target.value); };
  const auth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_AUTH, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const json = await res.json();
    setIsError(json.result === 'fail');
    setIsLoading(false);
    setIsLogin(json.result === 'ok');
    if (json.data) setData(json.data);
  };

  return (
    <div className="login-page">
      {isLoading ? (
        <div className="login-loading">
          <Loading />
        </div>
        ) : (
        <form className="login-form">
          <input type="password" id="nameField" onChange={handleChange} className={isError ? 'login-fail' : ''} />
          <button className="button-primary login-button" onClick={auth}>ENTER</button>
        </form>
      )}
      <a className="copyright" href='https://www.freepik.com/vectors/logo'>Logo vector created by freepik - www.freepik.com</a>
    </div>
  );
}

export default Login;