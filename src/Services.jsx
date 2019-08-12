import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilterSummaryLabel, FilterSelect } from './components';

class Services extends Component {
  constructor() {
    super();
    this.state = { idService: '', services: [] };
  }

  componentDidMount = () => {
    this.getServices();
  };

  handleOnSubmit = (ev) => {
    this.props.dispatch({
      type: 'SET_ID_FROM_COMBO',
      name: 'idService',
      value: this.state.idService,
    });
  };

  handleOnChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  render = () => {
    return (
      <>
        <FilterSummaryLabel>Services:</FilterSummaryLabel>
        <FilterSelect
          name="idService"
          value={this.props.idService}
          onChange={this.handleOnChange}
          onClick={this.handleOnSubmit}
        >
          {this.state.services.map((service, i) => (
            <option value={service.id} key={i}>
              {service.service}
            </option>
          ))}
        </FilterSelect>
      </>
    );
  };

  getServices = async () => {
    let response = await fetch('/item/services', {
      method: 'GET',
      credentials: 'same-origin',
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("Can't show the services");
      return;
    }
    //console.log('services ', body.services);
    let myServices = body.services;
    myServices.unshift({ id: '', service: '' });
    //console.log(myServices);
    this.setState({ services: myServices });
  };
}

let mapStateToProps = (state) => {
  return {
    idService: state.idService,
  };
};

export default connect(mapStateToProps)(Services);
