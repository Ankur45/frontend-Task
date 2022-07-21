import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const SigninComponent = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:8083/api/v1/user/signIn/', data)
      .then((res) => {
        console.log(res);
        if (res.data.success === 1) {
          localStorage.setItem('userId', res.data.data.userId);
          localStorage.setItem('token', res.data.data.token);
          history.push('/profile');
        } else if (res.data.success === 0) {
          alert('something went wrong or you enter wrong info');
          history.push('/login');
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div class="container-fluid signup">
      {' '}
      <div class="row">
        {' '}
        <div class="col-md-6">
          {' '}
          <div>
            {' '}
            <form class="box" onSubmit={handelSubmit}>
              {' '}
              <h1>Login</h1>{' '}
              <input
                type="text"
                name=""
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{' '}
              <input
                type="password"
                name=""
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{' '}
              <a class="forgot text-muted" href="#">
                Forgot password?
              </a>{' '}
              <input type="submit" name="" value="Login" href="#" />{' '}
            </form>{' '}
          </div>{' '}
        </div>{' '}
      </div>
    </div>
  );
};

export default SigninComponent;
