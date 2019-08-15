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

class Signup extends Component {
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
    let response = await fetch('/signup', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    //console.log(parsed);
    if (!parsed.success) {
      alert(parsed.message);
      document.getElementById('messageId').innerText = body.message;
      return;
    }
    this.props.dispatch({ type: 'LOGIN-SUCCESS', user: this.state.username });
  };

  render = () => {
    return (
      <WrapperSign>
        <HeaderSign>Signup to Allure</HeaderSign>
        <form onSubmit={this.handleOnSubmit}>
          <TitleSign>Username</TitleSign>
          <InputSign
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleOnChange}
          />
          <TitleSign>Password</TitleSign>
          <InputSign
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleOnChange}
          />
          <div>
            <Button>Signup</Button>
          </div>
          <DivError id="messageId" />
        </form>
        <div>
          Already have an account? <LinkSign to="/login">Login</LinkSign>
        </div>
      </WrapperSign>
    );
  };
}

let mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(Signup);
