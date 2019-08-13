import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilterSummaryLabel, FilterSelect } from './components';

class Dressers extends Component {
  constructor() {
    super();
    this.state = { idDresser: '', dressers: [] };
  }

  componentDidMount = () => {
    this.getDressers();
  };

  handleOnSubmit = (ev) => {
    this.props.dispatch({
      type: 'SET_ID_FROM_COMBO',
      name: 'idDresser',
      value: this.state.idDresser,
    });
  };

  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  render = () => {
    return (
      <>
        <FilterSummaryLabel>Hair dresser:</FilterSummaryLabel>
        <FilterSelect
          name="idDresser"
          value={this.props.idDresser}
          onChange={this.handleOnChange}
          onClick={this.handleOnSubmit}
        >
          {this.state.dressers.map((dresser, i) => (
            <option value={dresser.id} key={i}>
              {dresser.name}
            </option>
          ))}
        </FilterSelect>
      </>
    );
  };

  getDressers = async () => {
    let response = await fetch('/item/dressers', {
      method: 'GET',
      credentials: 'same-origin',
    });
    let body = await response.json();
    if (!body.success) {
      alert("Can't show the hair dressers");
      return;
    }

    let myDressers = body.dressers;
    myDressers.unshift({ id: '', name: '' });

    this.setState({ ...this.state, dressers: myDressers });
  };
}

let mapStateToProps = (state) => {
  return {
    idDresser: state.idDresser,
  };
};

export default connect(mapStateToProps)(Dressers);
