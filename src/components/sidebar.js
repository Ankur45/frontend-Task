import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const history = useHistory();

  const handleProfile = () => {
    history.push('/profile');
  };
  const handleSkill = () => {
    history.push('/skill');
  };
  const handleProject = () => {
    history.push('/project');
  };
  const handleReport = () => {
    history.push('/report');
  };

  const handleSignout = () => {
    let data = {
      userId: localStorage.getItem('userId'),
    };
    axios
      .post('http://localhost:8083/api/v1/user/logout', data)
      .then((res) => {
        console.log(res, 'rrrrrrr');
        if (res.data.success === 1) {
          localStorage.clear();
          history.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  return (
    <nav id="sidebar">
      <div class="sidebar-header"></div>

      <ul class="list-unstyled components">
        <li class="active">
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            onClick={handleProfile}
          >
            <i class="fa fa-product-hunt"></i> My Profile
          </a>
        </li>

        <li>
          <a
            href="#pageSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            onClick={handleSkill}
          >
            <i class="fa fa-calendar"></i> My Skills
          </a>
        </li>
        <li>
          <a href="#" onClick={handleProject}>
            <i class="fa fa-th-large"></i> My Projects
          </a>
        </li>
        <li>
          <a href="#" onClick={handleReport}>
            <i class="fa fa-files-o"></i> My Report
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" onClick={handleSignout}>
            Sign Out
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
