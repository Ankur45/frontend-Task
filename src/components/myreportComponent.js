import React, {useState, useEffect} from 'react';
import face from './../faces/1.jpg';
import axios from 'axios';
import {Rating} from 'react-simple-star-rating';
import {saveAs} from 'file-saver';

import Sidebar from './sidebar';
const MyreportComponent = () => {
  const [data, setData] = useState([]);
  const [arr1, setArr] = useState([]);
  const [user, setUser] = useState([]);

  const generatePdf = () => {
    let data5 = {
      userData: user,
      skillData: data,
      projectData: arr1,
    };
    axios
      .post('http://localhost:8083/create-pdf', data5, {responseType: 'blob'})
      .then((res) => {
        const pdf = new Blob([res.data], {type: 'aplication/pdf'});

        saveAs(pdf, 'report.pdf');
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    callApi();
    callApi1();
    callApi3();
  }, []);

  const callApi = () => {
    let data = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
    };

    axios
      .post('http://localhost:8083/api/v1/skill/getSkill', data)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  let tb_data1 = data.map((item, index) => {
    return (
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div key={index} class="skillAdd">
              <h1>{item.skillName}</h1>
              <Rating ratingValue={parseInt(item.rating)} />
            </div>
          </div>
        </div>
      </div>
    );
  });

  const callApi1 = () => {
    let data = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
    };

    axios
      .post('http://localhost:8083/api/v1/project/getProject', data)
      .then((res) => {
        setArr(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let tb_data2 = arr1.map((item, index) => {
    return (
      <div class="col-md-12">
        <div class="projectBox">
          <p class="name">{item.projectName}</p>
          <p class="name">{item.description}</p>
          {item.skillsUse.map((item, index) => {
            return <span class="item">{item}</span>;
          })}
        </div>
      </div>
    );
  });
  const callApi3 = () => {
    let data1 = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
    };

    axios
      .post('http://localhost:8083/api/v1/user/getUserDetail', data1)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div id="app">
      <div class="wrapper">
        <Sidebar />
        <div id="content">
          <div id="main" class="formStart">
            <header class="mb-3">
              <a href="#" class="burger-btn d-block d-xl-none">
                <i class="bi bi-justify fs-3"></i>
              </a>
            </header>

            <div class="page-content">
              <section class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card">
                        <div class="card-body py-4 px-5">
                          <h2>My Report</h2>
                          <div class="row skillreport">
                            <div class="col-md-5">
                              <button class="skill4">
                                <span>
                                  <i class="fa fa-share-alt"></i>
                                </span>
                                Share Report
                              </button>
                            </div>
                            <div class="col-md-7">
                              <button class="skill5" onClick={generatePdf}>
                                <span>
                                  <i class="fa fa-download"></i>
                                </span>
                                Download Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card">
                        <div class="card-body py-4 px-5">
                          <div class="d-flex align-items-center">
                            <div class="avatar avatar-xl">
                              <img src={face} alt="Face 1" />
                            </div>
                            <div class="ms-3 name pl-5">
                              <h5 class="font-bold">{user[0]?.name}</h5>
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
                            placeholder={user[0]?.email}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Contact</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder={user[0]?.contact}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">About Me</label>
                          <textarea
                            class="form-control"
                            rows="4"
                            cols="50"
                            placeholder={user[0]?.aboutMe}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h1>Skills</h1>
                  <div class="row">{tb_data1}</div>
                </div>
                <div class="col-md-12">
                  <h1>Projects</h1>
                  <div class="row">{tb_data2}</div>
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
                Add a new skill
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyreportComponent;
