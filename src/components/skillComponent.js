import React, {useState, useEffect} from 'react';
import Sidebar from './sidebar';
import {Rating} from 'react-simple-star-rating';
import axios from 'axios';
import './skillComponent.css';

const SkillComponent = () => {
  const [rating, setRating] = useState(0);
  const [skill, setSkill] = useState('');
  const [data, setData] = useState([]);

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      skill: skill,
      rating: rating,
    };

    axios
      .post('http://localhost:8083/api/v1/skill/addSkill', data)
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success === 1) {
          document.getElementById('create-course-form').reset();
          callApi();
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
                                    <i class="fa fa-plus"></i> Add Skill
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
                                  <i class="fa fa-plus"></i> Add Skill
                                </h3>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">{tb_data1}</div>
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
              <form id="create-course-form">
                <div class="form-group">
                  <label for="exampleInputEmail1">Skill</label>
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
                <div class="form-group">
                  <label for="exampleInputEmail1">Skill Rating</label>
                  <br />
                  <div>
                    <Rating onClick={handleRating} ratingValue={rating} />
                  </div>
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

export default SkillComponent;
