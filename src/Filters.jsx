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

const FiltersWrapper = styled.div`
  width: 250px;
  padding: 50px 20px;
`;

const FilterWrapper = styled.div`
  padding: 15px 0px;
  border-top: 1px solid #999999;
`;

const WrapperDobleCol = styled.div`
  display: flex; /*grid;*/
  /* grid-template-columns: auto auto; */
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 28px;
  font-family: Genath-Regular, serif;
  line-height: 1.2em;
  letter-spacing: 2px;
  padding-bottom: 15px;
`;

const SummaryLabel = styled.div`
  font-family: EngraversGothic BT, sans-serif;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  line-height: 18px;
  color: #999999;
`;

const SubWrapperPrice = styled.div`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
`;

const InputPrice = styled.input`
  font-family: Genath-Regular, serif;
  font-size: 16px;
  letter-spacing: 0;
  width: 100%;
  /* line-height: 30px; */
  /* padding: 5px 10px; */
  margin: 0;
  border: 1px solid #dddddd;
`;

const Select = styled.select`
  font-family: Genath-Regular, serif;
  font-size: 14px;
  letter-spacing: 0;
  width: 100%;
  border: 1px solid #dddddd;
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
          <WrapperDobleCol>
            <Title>Filters:</Title>
            {/* <a href="#" onClick={this.handleOnClear}>
              Clear all
            </a> */}
          </WrapperDobleCol>
        </FilterWrapper>

        <form onSubmit={this.handleOnSubmit}>
          <FilterWrapper>
            <SummaryLabel>Services:</SummaryLabel>
            <Select
              name="idService"
              value={this.state.idService}
              onChange={this.handleOnChange}
            >
              {this.state.services.map((service, i) => (
                <option value={service.id} key={i}>
                  {service.service}
                </option>
              ))}
            </Select>
          </FilterWrapper>

          <FilterWrapper>
            <SummaryLabel>Price:</SummaryLabel>
            <WrapperDobleCol>
              <SubWrapperPrice>
                <SummaryLabel>Min price:</SummaryLabel>
                <InputPrice
                  type="text"
                  name="minPrice"
                  onChange={this.handleOnChange}
                  value={this.state.minPrice}
                  pattern="[0-9]*"
                  placeholder="0"
                />
              </SubWrapperPrice>
              <SubWrapperPrice>
                <SummaryLabel>Max price:</SummaryLabel>
                <InputPrice
                  type="text"
                  name="maxPrice"
                  onChange={this.handleOnChange}
                  value={this.state.maxPrice}
                  pattern="[0-9]*"
                  placeholder="300"
                />
              </SubWrapperPrice>
            </WrapperDobleCol>
          </FilterWrapper>

          <FilterWrapper>
            <SummaryLabel>Hair dresser:</SummaryLabel>
            <Select
              name="idDresser"
              value={this.state.idDresser}
              onChange={this.handleOnChange}
            >
              {this.state.dressers.map((dresser, i) => (
                <option value={dresser.id} key={i}>
                  {dresser.name}
                </option>
              ))}
            </Select>
          </FilterWrapper>

          <FilterWrapper>
            <SummaryLabel>City:</SummaryLabel>
            <Select
              name="idCity"
              value={this.state.idCity}
              onChange={this.handleOnChange}
            >
              {this.state.cities.map((city, i) => (
                <option value={city.id} key={i}>
                  {city.name}
                </option>
              ))}
            </Select>
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
