import React, { Component } from 'react';
import { connect } from 'react-redux';
import Services from './Services.jsx';
import Dressers from './Dressers.jsx';
import Cities from './Cities.jsx';

import styled from 'styled-components';
const Wrapper = styled.div`
  width: 400px;
  background: yellow;
`;

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idDresser: '',
      idService: '',
      // idCity: '',
      title: '',
      description: '',
      price: '',
      file: undefined,
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: 'SET-CREATE-ITEM-FORM' });
  }

  handleOnSubmit = async (ev) => {
    ev.preventDefault();
    let formData = new FormData();

    formData.append('idDresser', this.props.idDresser);
    formData.append('idService', this.props.idService);
    formData.append('idCity', this.props.idCity);
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('cost', this.state.cost);
    formData.append('filename', this.state.file);

    let response = await fetch('/item/new', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    this.setState({
      idDresser: '',
      idService: '',
      idCity: '',
      title: '',
      description: '',
      cost: '',
      file: undefined,
    });
    document.getElementById('fileId').value = '';
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert('Error: item was not created');
      return;
    }
    this.props.dispatch({
      type: 'SHOW_COMPONENT',
      componentToShow: 'itemDetails',
    });
  };
  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleOnChangeFile = (ev) => {
    this.setState({ ...this.state, file: ev.target.files[0] });
  };

  handleCancel = (ev) => {
    this.props.dispatch({
      type: 'SHOW_COMPONENT',
      componentToShow: 'items',
    });
  };

  render = () => {
    return (
      <Wrapper>
        <form onSubmit={this.handleOnSubmit}>
          <h3>Dresser:</h3>
          <Dressers />
          <h3>Service:</h3>
          <Services />
          <h3>City:</h3>
          <Cities />
          <h3>title:</h3>
          <input
            type="text"
            name="title"
            onChange={this.handleOnChange}
            required
          />
          <h3>Description:</h3>
          <input
            type="text"
            name="description"
            onChange={this.handleOnChange}
            required
          />
          <h3>Cost:(CAD)</h3>
          <input
            type="text"
            name="cost"
            onChange={this.handleOnChange}
            pattern="[0-9]*"
            placeholder="20"
            required
          />
          <h3>File:</h3>
          <input
            type="file"
            onChange={this.handleOnChangeFile}
            id="fileId"
            required
          />

          <button>Submit</button>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </Wrapper>
    );
  };
}

let mapStateToProps = (state) => {
  return {
    idDresser: state.idDresser,
    idService: state.idService,
    idCity: state.idCity,
  };
};

export default connect(mapStateToProps)(CreateItem);
