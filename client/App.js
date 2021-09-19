import React from 'react';
import Front from './Pages/Front';
import Admin from './Pages/Admin';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }


  componentDidMount() {


  }
  render() {

    var style = {
      height: '100%'
    };

    return <div style={style}>
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Front />
          </Route>
        </Switch>
      </Router>
    </div>;
  }
}

export default App;
