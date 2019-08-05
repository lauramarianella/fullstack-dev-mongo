import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  FiltersWrapper,
  FilterWrapper,
  FilterWrapperDobleCol,
  FilterTitle,
  FilterSummaryLabel,
  FilterSubWrapperPrice,
  FilterInputPrice,
  FilterSelect,
} from './components';

class Filters extends Component {
  constructor() {
    super();
    this.state = {
      idService: '',
      minPrice: '',
      maxPrice: '',
      idDresser: '',
      idCity: '',
      services: [],
      dressers: [],
      cities: [],
    };
  }

  componentDidMount() {
    this.getFilters();
    this.handleOnSubmit();
  }

  getFilters = () => {
    this.getServices();
    this.getDressers();
    this.getCities();
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

  handleOnChange = (ev) => {
    //alert(ev.target.value);
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleOnClear = (ev) => {
    this.setState({
      ...this.state,
      idService: '',
      minPrice: '',
      maxPrice: '',
      idDresser: '',
      idCity: '',
    });
  };

  handleOnSubmit = async (ev) => {
    if (ev) ev.preventDefault();
    let formData = new FormData();
    formData.append('idService', this.state.idService);
    formData.append('idDresser', this.state.idDresser);
    formData.append('idCity', this.state.idCity);
    formData.append('minPrice', this.state.minPrice);
    formData.append('maxPrice', this.state.maxPrice);

    let response = await fetch('/item/search', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    });

    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
    }
    this.props.dispatch({ type: 'SET-LIST-ITEMS', listItems: body.listItems });
  };

  render = () => {
    return (
      <FiltersWrapper>
        <FilterWrapper>
          <FilterWrapperDobleCol>
            <FilterTitle>Filters:</FilterTitle>
            {/* <a href="#" onClick={this.handleOnClear}>
              Clear all
            </a> */}
          </FilterWrapperDobleCol>
        </FilterWrapper>

        <form onSubmit={this.handleOnSubmit}>
          <FilterWrapper>
            <FilterSummaryLabel>Services:</FilterSummaryLabel>
            <FilterSelect
              name="idService"
              value={this.state.idService}
              onChange={this.handleOnChange}
            >
              {this.state.services.map((service, i) => (
                <option value={service.id} key={i}>
                  {service.service}
                </option>
              ))}
            </FilterSelect>
          </FilterWrapper>

          <FilterWrapper>
            <FilterSummaryLabel>Price:</FilterSummaryLabel>
            <FilterWrapperDobleCol>
              <FilterSubWrapperPrice>
                <FilterSummaryLabel>Min price:</FilterSummaryLabel>
                <FilterInputPrice
                  type="text"
                  name="minPrice"
                  onChange={this.handleOnChange}
                  value={this.state.minPrice}
                  pattern="[0-9]*"
                  placeholder="0"
                />
              </FilterSubWrapperPrice>
              <FilterSubWrapperPrice>
                <FilterSummaryLabel>Max price:</FilterSummaryLabel>
                <FilterInputPrice
                  type="text"
                  name="maxPrice"
                  onChange={this.handleOnChange}
                  value={this.state.maxPrice}
                  pattern="[0-9]*"
                  placeholder="300"
                />
              </FilterSubWrapperPrice>
            </FilterWrapperDobleCol>
          </FilterWrapper>

          <FilterWrapper>
            <FilterSummaryLabel>Hair dresser:</FilterSummaryLabel>
            <FilterSelect
              name="idDresser"
              value={this.state.idDresser}
              onChange={this.handleOnChange}
            >
              {this.state.dressers.map((dresser, i) => (
                <option value={dresser.id} key={i}>
                  {dresser.name}
                </option>
              ))}
            </FilterSelect>
          </FilterWrapper>

          <FilterWrapper>
            <FilterSummaryLabel>City:</FilterSummaryLabel>
            <FilterSelect
              name="idCity"
              value={this.state.idCity}
              onChange={this.handleOnChange}
            >
              {this.state.cities.map((city, i) => (
                <option value={city.id} key={i}>
                  {city.name}
                </option>
              ))}
            </FilterSelect>
          </FilterWrapper>
          <FilterWrapper>
            <Button>Search</Button>
            <Button onClick={this.handleOnClear}>Clear all</Button>
          </FilterWrapper>
        </form>
      </FiltersWrapper>
    );
  };
}

let mapStateToProps = (state) => {
  return { listItems: state.listItems };
};

export default connect(mapStateToProps)(Filters);
