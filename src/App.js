import React, { useState }from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import Login from "pages/Login";
import LandingPage from "pages/LandingPage";
import ProtectedRoute from "components/route/ProtectedRoute";

// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/settings" component={Settings} isAuth={isAuth} />
          <ProtectedRoute exact path="/users" component={Tables} isAuth={isAuth} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuth={isAuth} />
          <Redirect from="*" to="/" />
        </Switch>
    </>
  );
}

export default App;
