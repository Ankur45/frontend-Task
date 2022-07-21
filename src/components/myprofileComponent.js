import React, {useState, useEffect} from 'react';
import './myprofileComponent.css';
import Sidebar from './sidebar';

import face from './../faces/1.jpg';
import axios from 'axios';

const MyprofileComponent = () => {
  const [data, setData] = useState([]);
  const [email, setEamil] = useState('');
  const [contact, setContact] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = () => {
    let data3 = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      contact: contact,
      aboutMe: about,
      email: email,
    };

    axios
      .post('http://localhost:8083/api/v1/user/update', data3)
      .then((res) => {
        console.log(res);
        if (res.data.success === 1) {
          callApi();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    let data1 = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
    };

    axios
      .post('http://localhost:8083/api/v1/user/getUserDetail', data1)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div id="app">
      <div class="wrapper">
        <Sidebar />
        <div id="content">
          <div id="main" class="formStart">
            <header class="mb-3"></header>

            <div class="page-content">
              <section class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card">
                        <div class="card-body py-4 px-5">
                          <div class="d-flex align-items-center">
                            <div class="avatar avatar-xl">
                              <img src={face} alt="Face 1" />
                            </div>
                            <div class="ms-3 name pl-5">
                              <h5 class="font-bold">{data[0]?.name}</h5>
                            </div>
                            <div class="edit">
                              <span
                                data-toggle="modal"
                                data-target="#exampleModal"
                              >
                                <i class="fa fa-pencil icon"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-9">
                      <form>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder={data[0]?.email}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Contact</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder={data[0]?.contact}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">About Me</label>
                          <textarea
                            class="form-control"
                            rows="4"
                            cols="50"
                            placeholder={data[0]?.aboutMe}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                update your detail
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEamil(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Contact</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your contact number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">About Me</label>
                  <textarea
                    class="form-control"
                    rows="4"
                    cols="50"
                    placeholder="Tell us what you do"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
                <button>Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyprofileComponent;
