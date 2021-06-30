import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import Login from "pages/Login";

// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";

function App() {
  return (
    <>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/users" component={Tables} />
          <Route exact path="/login" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
    </>
  );
}

export default App;
