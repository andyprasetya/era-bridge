import { Route, Switch, HashRouter } from "react-router-dom";
import {
  hashRouterHome,
  hashRouterAbout,
  hashRouterList,
} from "./constants/routes";
import "@material-tailwind/react/tailwind.css";
import Main from "./views/Main";
import About from "./views/About";
import NotFound404 from "./views/NotFound404";
import Workshop from "./views/info/Workshop";
import Message from "./views/info/Message";
import { constParams } from "./constants/formData";
import Verification from "./views/info/Verification";
import ResetPassword from "./views/info/ResetPassword";

export default function App() {
  return (
    // Navigate using react-router-dom hash router
    <HashRouter>
      <Switch>
        {hashRouterHome.map((home, index) => {
          return <Route exact path={home} key={index} component={Main} />;
        })}
        {hashRouterAbout.map((about, index) => {
          return <Route exact path={about} key={index} component={About} />;
        })}
        <Route exact path={hashRouterList.workshop} component={Workshop} />
        <Route exact path={hashRouterList.message} component={Message} />
        <Route
          exact
          path={
            hashRouterList.verification +
            `/:${constParams.id}/:${constParams.email}/:${constParams.token}`
          }
          component={Verification}
        />
        <Route
          exact
          path={
            hashRouterList.resetPassword +
            `/:${constParams.id}/:${constParams.email}/:${constParams.token}`
          }
          component={ResetPassword}
        />
        <Route component={NotFound404} />
      </Switch>
    </HashRouter>
  );
}
