import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  WrapperSign,
  Myh1Sign,
  MypSign,
  MyInputSign,
  MyLinkSign,
  Button,
  MydivError,
} from './components';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Laura',
      password: 'Laura',
    };
  }

  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleOnSubmit = async (ev) => {
    ev.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      document.getElementById('messageId').innerText =
        'Enter user and password';
      return;
    }

    let formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    let response = await fetch('/login', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      // alert('Login failed');
      document.getElementById('messageId').innerText = body.message;
      return;
    }
    this.props.dispatch({ type: 'LOGIN-SUCCESS' });
  };

  render = () => {
    return (
      <WrapperSign>
        <Myh1Sign>Login into Allure</Myh1Sign>
        <form onSubmit={this.handleOnSubmit}>
          <MypSign>Username</MypSign>
          <MyInputSign
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleOnChange}
            placeholder="Enter username"
          />
          <MypSign>Password</MypSign>
          <MyInputSign
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleOnChange}
            placeholder="Enter password"
          />
          <div>
            <Button>Login</Button>
          </div>
          <MydivError id="messageId" />
        </form>
        <div>
          Don't have an account? <MyLinkSign to="/signup">Signup</MyLinkSign>
        </div>
      </WrapperSign>
    );
  };
}

export default connect()(Login);
