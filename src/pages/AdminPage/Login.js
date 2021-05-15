import React from 'react';
import { useDispatch } from 'react-redux';
import { auth, database } from '../../firebase';
import useInput from '../../hooks/useInput';
import { loginUser } from '../../reducers/user';
import './index.scss';

const Login = ({ signup }) => {
  const dispatch = useDispatch();
  const email = useInput('');
  const password = useInput('');

  const handleLogin = e => {
    e.preventDefault();

    if (email.value.trim() && password.value.trim()) {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(async data => {
          const userData = data.user.providerData[0];
          const { ...rest } = userData;
          const user = { ...rest };
          console.log({ ...rest });
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
          // var curruser = auth.currentUser;

          // curruser
          //   .updateProfile({
          //     displayName: 'Nguyễn Trường Minh',
          //     photoURL:
          //       'https://firebasestorage.googleapis.com/v0/b/min-bnb.appspot.com/o/profilePic.jpg?alt=media&token=463b13db-c022-4005-907d-9b8f15f87cc1',
          //   })
          //   .then(function() {
          //     // Update successful.
          //   });
          dispatch(loginUser(user));
        });
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
