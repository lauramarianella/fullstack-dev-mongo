import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  WrapperSign,
  Myh1Sign,
  MypSign,
  MyInputSign,
  MyLinkSign,
  Button,
  MydivError,
} from './components';

const Wrapper = styled.div`
  padding: 50px 20px;
  background: yellow;
`;
const Myh1 = styled.div`
  font-size: 28px;
  font-family: Genath-Regular, serif;
  line-height: 1.2em;
  letter-spacing: 2px;
  background: red;
`;

const SummaryLabel = styled.div`
  font-family: EngraversGothic BT, sans-serif;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  line-height: 18px;
  color: #999999;
  background: green;
`;

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
      <Wrapper>
        <Myh1>Filters:</Myh1>
        <form onSubmit={this.handleOnSubmit}>
          <SummaryLabel>Services:</SummaryLabel>
          <select
            name="idService"
            value={this.state.idService}
            onChange={this.handleOnChange}
          >
            {this.state.services.map((service, i) => (
              <option value={service.id} key={i}>
                {service.service}
              </option>
            ))}
          </select>
          <div>
            <SummaryLabel>Price:</SummaryLabel>
            <h2>Min price:</h2>
            <input
              type="text"
              name="minPrice"
              onChange={this.handleOnChange}
              value={this.state.minPrice}
            />
            <h2>Max price:</h2>
            <input
              type="text"
              name="maxPrice"
              onChange={this.handleOnChange}
              value={this.state.maxPrice}
            />
          </div>
          <SummaryLabel>Hair dresser:</SummaryLabel>
          <select
            name="idDresser"
            value={this.state.idDresser}
            onChange={this.handleOnChange}
          >
            {this.state.dressers.map((dresser, i) => (
              <option value={dresser.id} key={i}>
                {dresser.name}
              </option>
            ))}
          </select>

          <SummaryLabel>City:</SummaryLabel>
          <select
            name="idCity"
            value={this.state.idCity}
            onChange={this.handleOnChange}
          >
            {this.state.cities.map((city, i) => (
              <option value={city.id} key={i}>
                {city.name}
              </option>
            ))}
          </select>
          <div>
            <input type="submit" value="Search" />
          </div>
        </form>
      </Wrapper>
    );
  };
}

let mapStateToProps = (state) => {
  return { listItems: state.listItems };
};

export default connect(mapStateToProps)(Filters);
