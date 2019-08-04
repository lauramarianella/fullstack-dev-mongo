import React, { Component } from 'react';
import { connect } from 'react-redux';

let Logout = (props) => {
  handleOnClick(props);
  return <div>Thanks for using our services!!!</div>;
};
let handleOnClick = async (props) => {
  let response = await fetch('/logout', {
    method: 'GET',
    credentials: 'include',
  });
  let responseBody = await response.text();
  let parsed = JSON.parse(responseBody);
  if (!parsed.success) {
    alert("can't logout");
    return;
  }
  props.dispatch({ type: 'LOGOUT-SUCCESS' });
};

export default connect()(Logout);
