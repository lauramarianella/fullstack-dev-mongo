import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Logout from './Logout.jsx';
import Search from './Search.jsx';
import Filters from './Filters.jsx';
import Items from './Items.jsx';
import ItemDetails from './ItemDetails.jsx';

import styled from 'styled-components';
import './main.css';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--bg-content-color);
`;
const Wrapper2Cols = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  background: var(--bg-content-color);
`;

class App extends Component {
  constructor(props) {
    super(props);
  }

  renderHome() {
    return; // <Home />;
    //return <div>Home</div>;
  }
  renderLogin() {
    return <Login />;
  }
  renderSignup() {
    return <Signup />;
  }
  renderLogout() {
    return <Logout />;
  }

  render = () => {
    console.log('app.jsx this.props.loggedIn ', this.props.loggedIn);
    if (this.props.loggedIn) {
      let componentToShow = <Items />;
      if (this.props.componentToShow === 'items') componentToShow = <Items />;
      if (this.props.componentToShow === 'itemDetails')
        componentToShow = <ItemDetails />;

      return (
        <BrowserRouter>
          <Wrapper>
            <Navbar />
            <Route path="/" exact render={this.renderHome} />
            <Route path="/logout" render={this.renderLogout} />
            <Wrapper2Cols>
              <div>
                {/* <Search /> */}
                <Filters />
              </div>
              <div>{componentToShow}</div>
            </Wrapper2Cols>
          </Wrapper>
        </BrowserRouter>
      );
    }

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
  };
}

let mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    componentToShow: state.componentToShow,
  };
};
export default connect(mapStateToProps)(App);
