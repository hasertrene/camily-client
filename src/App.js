import React, { useEffect } from "react";
import "./App.scss";
import Calendar from "./pages/Calendar/calendar";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { selectToken } from "./store/user/selectors";
import { Container } from "react-bootstrap";

const Home = () => (
  <Container>
    <h1>Calendar</h1>
  </Container>
);
const Other = () => (
  <Container>
    <h1>Other</h1>
  </Container>
);

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
        <Route exact path='/' component={token ? Calendar : Login} />
        <Route path='/other' component={Other} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
      </Switch>
      <Navigation />
    </div>
  );
}

export default App;
