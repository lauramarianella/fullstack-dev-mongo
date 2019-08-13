import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  browserHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Logout from './Logout.jsx';
import CreateItem from './CreateItem.jsx';

import { StripeProvider } from 'react-stripe-elements';

import styled from 'styled-components';
import './main.css';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--bg-content-color);
`;

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.isAlreadyLoggedIn();
  }

  isAlreadyLoggedIn = async () => {
    let response = await fetch('/alreadyLoggedIn', {
      method: 'GET',
      credentials: 'include',
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      // alert('NO Loged in');
      return;
    }
    this.props.dispatch({ type: 'LOGIN-SUCCESS' });
  };

  renderHome() {
    return <Home />;
  }
  renderLogin() {
    return <Login />;
  }
  renderSignup() {
    return <Signup />;
  }
  renderCreateItem() {
    return <CreateItem />;
  }
  renderLogout() {
    return <Logout />;
  }

  render = () => {
    let content = [];

    if (this.props.loggedIn) {
      return (
        /*pk_test_6pRNASCoBOKtIshFeQd4XMUh this is from the DEMO...*/
        <StripeProvider apiKey="pk_test_9IrtnqiGkcghOzRVW8C3NvAa00RFQz6IoQ">
          <BrowserRouter>
            <Wrapper>
              <Navbar />
              <Route path="/" exact render={this.renderHome} />
              <Route path="/item/new" exact render={this.renderCreateItem} />
              <Route path="/logout" render={this.renderLogout} />
              <Route path="/login">
                <Redirect to="/" />
              </Route>
            </Wrapper>
          </BrowserRouter>
        </StripeProvider>
      );
    } else {
      return (
        <BrowserRouter>
          <Wrapper>
            <Navbar />
            <Route path="/" exact render={this.renderLogin} />
            <Route path="/login" render={this.renderLogin} />
            <Route path="/signup" render={this.renderSignup} />
            <Route path="/logout">
              <Redirect to="/" />
            </Route>
          </Wrapper>
        </BrowserRouter>
      );
    }
  };
}

let mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};
export default connect(mapStateToProps)(App);
