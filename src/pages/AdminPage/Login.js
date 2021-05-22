import React from 'react';
import { useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { auth } from '../../firebase';
import useInput from '../../hooks/useInput';

import './index.scss';

const Login = ({ signup }) => {
  const email = useInput('');
  const password = useInput('');

  const handleLogin = e => {
    e.preventDefault();

    if (email.value.trim() && password.value.trim()) {
      auth.signInWithEmailAndPassword(email.value, password.value);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2>Đăng Nhập</h2>

        <form onSubmit={handleLogin}>
          <input
            className="login_input"
            type="email"
            name="email"
            placeholder="johnwick@gmail.com"
            value={email.value}
            onChange={email.onChange}
          />

          <input
            className="login_input"
            type="password"
            name="password"
            placeholder="password"
            value={password.value}
            onChange={password.onChange}
          />

          <div className="login-signup">
            <button>Đăng Nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
