import React, { Component } from 'react';
import { connect } from 'react-redux';
import Services from './Services.jsx';
import Dressers from './Dressers.jsx';
import Cities from './Cities.jsx';

import {
  InputSign,
  FilterInputPrice,
  FilterWrapperDobleCol,
  Button,
} from './components';

import styled from 'styled-components';
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  box-sizing: border-box;
  padding: 0 5px;
  background: yellow;
`;

const SubWrapper = styled.div`
  padding: 15px 0px;
  max-width: 500px;
`;

const TextArea = styled.textarea`
  max-width: 300px;
  width: 100%;
  height: 90px;
  margin-bottom: 20px;
  border: 1.5px solid rgb(233, 231, 231);
  background: transparent;
  outline: none;

  font-size: 0.9rem; /*16px*/
`;

const FilterSubWrapperPrice = styled.div`
  display: inline-block;
  width: 30%;
  box-sizing: border-box;
  padding-right: 10px;
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
          <SubWrapper>
            <Dressers />
          </SubWrapper>
          <h3>Service:</h3>
          <SubWrapper>
            <Services />
          </SubWrapper>
          <h3>City:</h3>
          <SubWrapper>
            <Cities />
          </SubWrapper>
          <h3>title:</h3>
          <InputSign
            type="text"
            name="title"
            placeholder="Use an appealing title"
            onChange={this.handleOnChange}
            required
          />
          <h3>Description:</h3>
          <TextArea
            name="description"
            placeholder="Describe the service provided"
            onChange={this.handleOnChange}
          />
          <FilterWrapperDobleCol>
            <h3>Cost:(CAD)</h3>
            <FilterSubWrapperPrice>
              <FilterInputPrice
                type="text"
                name="cost"
                onChange={this.handleOnChange}
                min="0" // pattern="[0-9]*"
                step=".01"
                placeholder="19.99"
                required
              />
            </FilterSubWrapperPrice>
          </FilterWrapperDobleCol>
          <h3>File:</h3>
          <input
            type="file"
            onChange={this.handleOnChangeFile}
            id="fileId"
            required
          />
          <SubWrapper>
            <Button>Submit</Button>
          </SubWrapper>
        </form>
        <Button onClick={this.handleCancel}>Cancel</Button>
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
