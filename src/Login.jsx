import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  WrapperSign,
  HeaderSign,
  TitleSign,
  InputSign,
  LinkSign,
  Button,
  DivError,
} from './components';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    this.props.dispatch({ type: 'LOGIN-SUCCESS', user: this.state.username });
  };

  render = () => {
    return (
      <WrapperSign>
        <HeaderSign>Login into Allure</HeaderSign>
        <form onSubmit={this.handleOnSubmit}>
          <TitleSign>Username</TitleSign>
          <InputSign
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleOnChange}
            placeholder="Enter username"
          />
          <TitleSign>Password</TitleSign>
          <InputSign
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleOnChange}
            placeholder="Enter password"
          />
          <div>
            <Button>Login</Button>
          </div>
          <DivError id="messageId" />
        </form>
        <div>
          Don't have an account? <LinkSign to="/signup">Signup</LinkSign>
        </div>
      </WrapperSign>
    );
  };
}

export default connect()(Login);
