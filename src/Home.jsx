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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    let componentToShow = <Items />;
    if (this.props.componentToShow === 'items') componentToShow = <Items />;
    if (this.props.componentToShow === 'itemDetails')
      componentToShow = (
        <div>
          <ItemDetails />
        </div>
      );
    if (this.props.componentToShow === 'checkoutForm')
      componentToShow = (
        <>
          <Elements>
            <ChekoutForm />
          </Elements>
        </>
      );
    return (
      <Wrapper2Cols>
        <div>
          {/* <Search /> */}
          <Filters />
        </div>
        {componentToShow}
      </Wrapper2Cols>
    );
  };
}
let mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    componentToShow: state.componentToShow,
  };
};

export default connect(mapStateToProps)(Home);
