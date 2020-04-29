import React, { useEffect } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Events from "./pages/Events";
import Family from "./pages/Family";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { selectToken } from "./store/user/selectors";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  const token = useSelector(selectToken);

  return (
    <div className='App'>
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path='/events/:year' component={token ? Events : Login} />
        <Route
          exact
          path='/:year/:month'
          component={token ? Calendar : Login}
        />
        <Route exact path='/' component={token ? Calendar : Login} />
        <Route exact path='/events' component={token ? Events : Login} />
        <Route path='/family' component={token ? Family : Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
      </Switch>
      <Navigation />
    </div>
  );
}

export default App;
