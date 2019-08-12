import React, { Component } from 'react';
import { connect } from 'react-redux';
import Services from './Services.jsx';
import Dressers from './Dressers.jsx';
import Cities from './Cities.jsx';

import {
  Button,
  FiltersWrapper,
  FilterWrapper,
  FilterWrapperDobleCol,
  FilterTitle,
  FilterSummaryLabel,
  FilterSubWrapperPrice,
  FilterInputPrice,
} from './components';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // idService: '',
      minPrice: '',
      maxPrice: '',
      // idDresser: '',
      // idCity: '',
    };
  }

  componentDidMount() {
    this.handleOnSubmit();
  }

  handleOnChange = (ev) => {
    //alert(ev.target.value);
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleOnClear = (ev) => {
    this.setState({
      ...this.state,
      // idService: '',
      minPrice: '',
      maxPrice: '',
      //idDresser: '',
      // idCity: '',
    });

    this.props.dispatch({
      type: 'SET_ID_FROM_COMBO',
      name: 'idService',
      value: '',
    });
    this.props.dispatch({
      type: 'SET_ID_FROM_COMBO',
      name: 'idDresser',
      value: '',
    });
    this.props.dispatch({
      type: 'SET_ID_FROM_COMBO',
      name: 'idCity',
      value: '',
    });
  };

  handleOnSubmit = async (ev) => {
    if (ev) ev.preventDefault();

    let formData = new FormData();
    formData.append('idService', this.props.idService);
    formData.append('idDresser', this.props.idDresser);
    formData.append('idCity', this.props.idCity);

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
            <Services />
          </FilterWrapper>

          <FilterWrapper>
            <FilterSummaryLabel>Price (CAD):</FilterSummaryLabel>
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
            <Dressers />
          </FilterWrapper>

          <FilterWrapper>
            <Cities />
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
  return {
    listItems: state.listItems,
    idService: state.idService,
    idDresser: state.idDresser,
    idCity: state.idCity,
  };
};

export default connect(mapStateToProps)(Filters);
