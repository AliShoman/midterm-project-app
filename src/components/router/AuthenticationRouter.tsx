import { AuthContext } from "../../context/Context";
import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import DrawerLayout from "../drawer/DrawerLayout";

export default function AuthenticationRouter() {
  const context = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path={"/sign-in"}>
          {context.user ? <Redirect to={"/"} /> : <SignIn />}
        </Route>
        <Route path={"/sign-up"}>
          {context.user ? <Redirect to={"/"} /> : <SignUp />}
        </Route>
        <Route path={"/"}>
          {context.user ? <DrawerLayout/> : <Redirect to={"/sign-in"} />}
        </Route>
      </Switch>
    </Router>
  );
}
