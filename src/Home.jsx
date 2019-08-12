import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Elements } from 'react-stripe-elements';
import ChekoutForm from './CheckoutForm.jsx';

import Search from './Search.jsx';
import Filters from './Filters.jsx';
import Items from './Items.jsx';
import ItemDetails from './ItemDetails.jsx';

import styled from 'styled-components';
const Wrapper2Cols = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  background: var(--bg-content-color);
`;
const Div = styled.div`
  width: 300px;
  background: #fff;
`;
const Wrapper1Col = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  & > ${Div} {
    min-width: 60%;
  }
  background: var(--bg-content-color);
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    let componentsToShow = [];
    componentsToShow.push(
      <div key="divFilters">
        {/* <Search /> */}
        <Filters key="filters" />
      </div>
    );

    if (this.props.componentToShow === 'items')
      componentsToShow.push(<Items key="items" />);
    if (this.props.componentToShow === 'itemDetails')
      componentsToShow.push(
        <div key="divItemDetails">
          <ItemDetails key="itemDetails" />
        </div>
      );

    if (this.props.componentToShow === 'checkoutForm')
      return (
        <Wrapper1Col key="wrapPay">
          <Div key="divPay">
            <Elements key="elemPay">
              <ChekoutForm key="formPay" />
            </Elements>
          </Div>
        </Wrapper1Col>
      );
    return <Wrapper2Cols key="wrap2Cols">{componentsToShow}</Wrapper2Cols>;
  };
}
let mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    componentToShow: state.componentToShow,
  };
};

export default connect(mapStateToProps)(Home);
