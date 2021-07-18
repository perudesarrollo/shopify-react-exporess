import Api from "./services/api";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from 'reactstrap';

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import Userfront from "@userfront/react";
import Home from "./Home";
import Nav from "./components/nav";
import ActivarApp from "./components/activarApp";

Userfront.init("demo1234");

const SignupForm = Userfront.build({
  toolId: "nkmbbm",
});
const LoginForm = Userfront.build({
  toolId: "alnkkd",
});
const PasswordResetForm = Userfront.build({
  toolId: "dkbmmo",
});

function App() {
  return (
    <Router>
      <div>
        <Nav Userfront={Userfront} />
        <Switch>
          <Route path="/auth/callback">
            <AuthCallback />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/reset">
            <PasswordReset />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const SignUp = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};
const PasswordReset = () => {
  return (
    <div>
      <h2>Password Reset</h2>
      <PasswordResetForm />
    </div>
  );
};

const AuthCallback = () => {
  const [validation, setValidation] = useState({ code: false, message: "" });
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      let response = await Api.auth(location.search);
      setValidation(response);
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        {validation.code === 401 ? <ActivarApp /> : <Redirect to="/" />}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const renderFn = ({ location }) => {
    // If the user is not logged in, redirect to login
    if (!Userfront.accessToken()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    }

    // If the user is logged in, show the dashboard
    const userData = JSON.stringify(Userfront.user, null, 2);
    return (
      <div>
        <h2>Dashboard</h2>

        <button type="button" className="">
          Test Productos
        </button>
        <img src={Userfront.user.image} which="100" height="100" alt="Logo" />
        <br />
        <pre>{userData}</pre>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  };

  return <Route render={renderFn} />;
};

// getInfo();
export default App;
