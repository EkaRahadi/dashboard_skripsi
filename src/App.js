import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import Login from "pages/Login";
import LandingPage from "pages/LandingPage";

// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";

function App() {
  return (
    <>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/users" component={Tables} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect from="*" to="/" />
        </Switch>
    </>
  );
}

export default App;
