import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilterSummaryLabel, FilterSelect } from './components';

class Cities extends Component {
  constructor() {
    super();
    this.state = { idCity: '', cities: [] };
  }

  componentDidMount = () => {
    this.getCities();
  };

  handleOnSubmit = (ev) => {
    this.props.dispatch({
      type: 'SET_ID_FROM_COMBO',
      name: 'idCity',
      value: this.state.idCity,
    });
  };

  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  render = () => {
    return (
      <>
        <FilterSummaryLabel>City:</FilterSummaryLabel>
        <FilterSelect
          name="idCity"
          value={this.props.idCity}
          onChange={this.handleOnChange}
          onClick={this.handleOnSubmit}
        >
          {this.state.cities.map((city, i) => (
            <option value={city.id} key={i}>
              {city.name}
            </option>
          ))}
        </FilterSelect>
      </>
    );
  };

  getCities = async () => {
    let response = await fetch('/item/cities', {
      method: 'GET',
      credentials: 'same-origin',
    });
    let body = await response.json();
    if (!body.success) {
      alert("Can't show the cities");
      return;
    }
    let myCities = body.cities;
    myCities.unshift({ id: '', name: '' });
    this.setState({ ...this.state, cities: myCities });
  };
}

let mapStateToProps = (state) => {
  return {
    // listItems: state.listItems,
    idCity: state.idCity,
  };
};

export default connect(mapStateToProps)(Cities);
