import React, { Component } from 'react';
import Home from "./components/Home";
import './App.css';

import Main from "./components/AdminPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



class App extends Component {
  render() {
    return (
 <div>
      
      <Router>
      
          <Route exact path="/" component={Home} />

        
      
      </Router>
      </div>
    );
  }
}

export default App;
