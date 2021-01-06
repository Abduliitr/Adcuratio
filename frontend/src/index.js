
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import ReactNotification from 'react-notifications-component'
// import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

// import LoginPage
import LoginPage from './components/Login/LoginPage'
import RegisterPage from './components/Login/RegisterPage'

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <ReactNotification />
    <Switch>
      <Route path="/login" render={(props) => <LoginPage {...props} />} />
      <Route path="/register" render={(props) => <RegisterPage {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

      {localStorage.getItem('tokn') ? <Redirect to="/admin/dashboard" /> :<Redirect to="/login" />}
      
    </Switch>
  </Router>,
  document.getElementById("root")
);
