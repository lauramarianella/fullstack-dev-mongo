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
  ButtonLink,
} from './components';

import styled from 'styled-components';
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  box-sizing: border-box;
  padding: 0 5px;
  background: var(--bg-content-color);
  border: 1px solid var(--border-color);
`;
const SubWrapper = styled.div`
  max-width: 500px;
  /* border: 1px solid yellow; */
`;

const SubWrapperBtns = styled.div`
  padding: 15px 0px;
  max-width: 500px;
  /* border: 1px solid red; */
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
    //document.getElementById('fileId').value = '';
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert('Error: item was not created');
      return;
    }
    document.getElementById('idLinkCancel').click();
    // this.props.dispatch({
    //   type: 'SHOW_COMPONENT',
    //   componentToShow: 'itemDetails',
    // });
  };
  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleOnChangeFile = (ev) => {
    this.setState({ ...this.state, file: ev.target.files[0] });
  };

  handleCancel = (ev) => {
    ev.preventDefault();
    document.getElementById('idLinkCancel').click();
    // this.props.dispatch({
    //   type: 'SHOW_COMPONENT',
    //   componentToShow: 'items',
    // });
  };

  render = () => {
    return (
      <Wrapper>
        <form onSubmit={this.handleOnSubmit}>
          <SubWrapper>
            <h4>Dresser:</h4>
            <Dressers />
          </SubWrapper>
          <SubWrapper>
            <h4>Service:</h4>
            <Services />
          </SubWrapper>
          <SubWrapper>
            <h4>City:</h4>
            <Cities />
          </SubWrapper>
          <h4>title:</h4>
          <InputSign
            type="text"
            name="title"
            placeholder="Use an appealing title"
            onChange={this.handleOnChange}
            required
          />
          <h4>Description:</h4>
          <TextArea
            name="description"
            placeholder="Describe the service provided"
            onChange={this.handleOnChange}
          />
          <FilterWrapperDobleCol>
            <h4>Cost:(CAD)</h4>
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
          <h4>File:</h4>
          <input
            type="file"
            onChange={this.handleOnChangeFile}
            id="fileId"
            required
          />
          <SubWrapperBtns>
            <SubWrapper>
              <Button>Submit</Button>
            </SubWrapper>
          </SubWrapperBtns>
        </form>
        <Button onClick={this.handleCancel}>Cancel</Button>
        <ButtonLink to="/" id="idLinkCancel" style={{ display: 'none' }}>
          Cancel Link
        </ButtonLink>
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
