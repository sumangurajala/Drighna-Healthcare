import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StaffForm from './components/StaffForm';
import HumanResource from './components/HumanResource';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/staff-form/:staffId?" component={StaffForm} />
        <Route path="/" component={HumanResource} />
      </Switch>
    </Router>
  );
};

export default App;
