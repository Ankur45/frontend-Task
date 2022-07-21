import React, {useState} from 'react';
import './signupComponent.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const SignupComponent = () => {
  const history = useHistory();
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirnm] = useState('');

  const handelclick = (e) => {
    e.preventDefault();

    var data = {
      name: Username,
      email: email,
      password: password,
      confirmPassword: confirm,
    };

    axios
      .post('http://localhost:8083/api/v1/user/signUp', data)
      .then((res) => {
        console.log(res, 'rrrrrrr');
        if (res.data.success === 1) {
          history.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
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
            <form class="box" onSubmit={handelclick}>
              {' '}
              <h1>Sign Up</h1>{' '}
              <input
                type="text"
                name=""
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />{' '}
              <input
                type="text"
                name=""
                placeholder="Email"
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
              <input
                type="password"
                name=""
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirnm(e.target.value)}
              />{' '}
              <input type="submit" name="" value="Sign Up" href="#" />{' '}
              <p>Already have an acoount?</p>
              <a class="forgot text-muted" href="#">
                Sign In
              </a>{' '}
            </form>{' '}
          </div>{' '}
        </div>{' '}
      </div>
    </div>
  );
};

export default SignupComponent;
