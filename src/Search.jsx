import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleOnSubmit}>
          <h2>Search Item</h2>
          <input
            type="text"
            name="itemDescription"
            onChange={this.handleOnChange}
          />
          <input type="submit" />
        </form>
      </div>
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
