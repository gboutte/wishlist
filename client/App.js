import React from 'react';
import Front  from './Components/Front';
import Loader  from './Components/Loader';
import Admin  from './Components/Admin';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

        };

  }


  componentDidMount() {


  }
  render() {
    console.log("ddd");

    var style={
      height:"100%"
    }
    return <div style={style}>
      <Router>
        <Switch>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/">
          <Front/>
        </Route>
      </Switch>
      </Router>
    </div>;
  }
}

export default App;
