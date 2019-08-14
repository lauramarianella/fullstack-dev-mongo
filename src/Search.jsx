import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  width: 70%;
  padding: 17px 50px 0px 50px;
`;
const InputSearch = styled.input`
  width: 100%;
  margin-bottom: 20px;
  border: 1.5px solid rgb(233, 231, 231);
  outline: none;
  height: 30px;
  font-size: 0.9rem; /*16px*/
  background: var(--bg-primary-color);
  color: var(--font-primary-color); /* background: transparent; */
  border-radius: var(--border-radius-s);
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
        <form onSubmit={this.handleOnSubmit}>
          <InputSearch
            type="text"
            name="itemDescription"
            onChange={this.handleOnChange}
            placeholder="type an style..."
          />
        </form>
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
