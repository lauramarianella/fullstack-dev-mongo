import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idDresser: '',
      idService: '',
      idCity: '',
      title: '',
      description: '',
      price: '',
      file: undefined,
    };
  }
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'SET-CREATE-ITEM-FORM',
    // });
  }

  handleOnSubmit = async (ev) => {
    ev.preventDefault();
    let formData = new FormData();

    formData.append('idDresser', this.state.idDresser);
    formData.append('idService', this.state.idService);
    formData.append('idCity', this.state.idCity);
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
    if (!body.success) alert('item no creado');
  };
  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleOnChangeFile = (ev) => {
    this.setState({ ...this.state, file: ev.target.files[0] });
  };

  render = () => {
    return (
      <>
        <form onSubmit={this.handleOnSubmit}>
          <h3>Dresser:</h3>
          <input type="text" name="idDresser" onChange={this.handleOnChange} />
          <h3>Service:</h3>
          <input type="text" name="idService" onChange={this.handleOnChange} />
          <h3>City:</h3>
          <input type="text" name="idCity" onChange={this.handleOnChange} />
          <h3>title:</h3>
          <input type="text" name="title" onChange={this.handleOnChange} />
          <h3>Description:</h3>
          <input
            type="text"
            name="description"
            onChange={this.handleOnChange}
          />
          <h3>Cost:</h3>
          <input type="text" name="cost" onChange={this.handleOnChange} />
          <h3>File:</h3>
          <input type="file" onChange={this.handleOnChangeFile} id="fileId" />

          <input type="submit" />
        </form>
      </>
    );
  };
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(CreateItem);
