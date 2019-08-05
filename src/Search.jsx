import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Button, InputSign, FilterTitle } from './components';

const SearchWrapper = styled.div`
  width: 250px;
  padding: 30px 20px 0px 20px;
`;

const SearchSubWrapper = styled.div`
  padding: 15px 0px;
  border-top: 1px solid #999999;
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDescription: '',
    };
  }

  componentDidMount() {
    //this.handleOnSubmit(undefined);
  }

  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleOnSubmit = async (ev) => {
    if (ev) ev.preventDefault();
    let formData = new FormData();
    formData.append('itemDescription', this.state.itemDescription);
    let response = await fetch('/item/search', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert('Item not found');
      return;
    }
    this.props.dispatch({
      type: 'SET-LIST-ITEMS',
      listItems: body.listItems,
    });
  };

  render = () => {
    return (
      <SearchWrapper>
        <SearchSubWrapper>
          <form onSubmit={this.handleOnSubmit}>
            <FilterTitle>Search Item:</FilterTitle>
            <InputSign
              type="text"
              name="itemDescription"
              onChange={this.handleOnChange}
            />
            <Button>Search</Button>
          </form>
        </SearchSubWrapper>
      </SearchWrapper>
    );
  };
}

let mapStateToProps = (state) => {
  return {
    listItems: state.listItems,
    itemDetails: state.itemDetails,
  };
};
export default connect(mapStateToProps)(Search);
