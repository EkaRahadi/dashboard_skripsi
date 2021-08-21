import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import Login from "pages/Login";
import LandingPage from "pages/LandingPage";
import Parameter from "pages/Parameter";
import Dataset from "pages/Dataset";
import LandingPageDetail from "pages/LandingPageDetail";
import ParameterDetail from "pages/ParameterDetail";
import ProtectedRoute from "components/route/ProtectedRoute";

// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";

function App() {
  const token = window.localStorage.getItem("token");

  return (
    <>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/landing-detail" component={LandingPageDetail} />
          <Route exact path="/parameter-detail" component={ParameterDetail} />
          <ProtectedRoute exact path="/settings" component={Settings} isAuth={ token ? true : false } />
          <ProtectedRoute exact path="/users" component={Tables} isAuth={ token ? true : false } />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuth={ token ? true : false } />
          <ProtectedRoute exact path="/parameters" component={Parameter} isAuth={ token ? true : false } />
          <ProtectedRoute exact path="/datasets" component={Dataset} isAuth={ token ? true : false } />
          <Redirect from="*" to="/" />
        </Switch>
    </>
  );
}

export default App;
