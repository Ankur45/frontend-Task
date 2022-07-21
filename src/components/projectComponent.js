import React, {useState, useEffect} from 'react';
import Sidebar from './sidebar';
import axios from 'axios';
import './projectComponent.css';

const ProjectComponent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [skill, setSkill] = useState([]);
  const [arr1, setArr] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = skill.split(',');
    let data = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      projectName: name,
      description: description,
      skillsUse: arr,
    };

    axios
      .post('http://localhost:8083/api/v1/project/addProject', data)
      .then((res) => {
        console.log(res);
        if (res.data.success === 1) {
          callApi();
        } else if (res.data.success === 0) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
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

  let tb_data1 = arr1.map((item, index) => {
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
                          <div class="d-flex align-items-center">
                            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                              <div class="input-group">
                                <div class="input-group-prepend">
                                  <button
                                    id="button-addon2"
                                    type="submit"
                                    class="btn btn-link text-warning"
                                  >
                                    <i class="fa fa-search"></i>
                                  </button>
                                </div>
                                <input
                                  type="search"
                                  placeholder="Search for projects"
                                  aria-describedby="button-addon2"
                                  class="form-control border-0 bg-light"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                />

                                <div
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a class="dropdown-item">Html</a>
                                  <a class="dropdown-item">React</a>
                                  <a
                                    class="dropdown-item"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                  >
                                    <i class="fa fa-plus"></i> Add project
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="edit">
                              <span
                                data-toggle="modal"
                                data-target="#exampleModal"
                              >
                                <h3 class="skill">
                                  <i class="fa fa-plus"></i> Add project
                                </h3>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="row">{tb_data1}</div>
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
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Project Name</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Project description</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Skill Use</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                </div>
                <div class="button">
                  <button
                    onClick={handleSubmit}
                    data-dismiss="modal"
                    aria-label="Close"
                    class="submitbutton"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
