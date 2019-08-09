import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderForm from './OrderForm.jsx';

import styled, { css } from 'styled-components';
// https://www.webucator.com/how-to/how-style-table-with-css.cfm
import {
  CardTitle,
  DetailsWrapperDobleCol,
  ImgLarge,
  P,
  PDresser,
} from './components';

const Wrapper = styled.div`
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px #ddd;
  margin: 20px;
  border-radius: var(--border-radius-s);
  width: 650px;
  /* height: 100vh; */
  /* height: 600px; */
`;

class ItemDetails extends Component {
  render() {
    if (!this.props.itemDetails.item.description) return '';
    return (
      <Wrapper>
        <CardTitle>{this.props.itemDetails.item.title}</CardTitle>
        <DetailsWrapperDobleCol>
          <div>
            <ImgLarge src={`${this.props.itemDetails.item.imgSrc}`} />
          </div>
          <div>
            <P>${this.props.itemDetails.item.cost}</P>
            <P>{this.props.itemDetails.item.description}</P>
          </div>
        </DetailsWrapperDobleCol>

        <PDresser>@by {this.props.itemDetails.dresser.name}</PDresser>

        <OrderForm />
      </Wrapper>
    );
  }
}

let mapStateToProps = (state) => {
  return { itemDetails: state.itemDetails };
};

export default connect(mapStateToProps)(ItemDetails);
