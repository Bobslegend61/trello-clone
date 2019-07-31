import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Header from './components/header/Header';
import Board from './containers/Board';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/board/:id" component={Board} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
