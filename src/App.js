import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import signupComponent from './components/signupComponent';
import SigninComponent from './components/signinComponent';
import MyprofileComponent from './components/myprofileComponent';
import SkillComponent from './components/skillComponent';
import ProjectComponent from './components/projectComponent';
import MyreportComponent from './components/myreportComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={signupComponent} />
          <Route exact path="/login" component={SigninComponent} />
          <Route path="/profile" component={MyprofileComponent} />
          <Route exact path="/skill" component={SkillComponent} />
          <Route exact path="/project" component={ProjectComponent} />
          <Route exact path="/report" component={MyreportComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
