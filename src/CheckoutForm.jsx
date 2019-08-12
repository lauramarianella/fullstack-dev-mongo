import React, { Component } from 'react';
import { connect } from 'react-redux';

import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';

//https://www.youtube.com/watch?v=dEahSdI7p7M

import styled from 'styled-components';
import {
  Button,
  WrapperBtn,
  InputSign,
  Table,
  Caption,
  Th,
  TdCenter,
  TdRight,
  TdLeft,
  TrEven,
  TFoot,
} from './components';

const Wrapper = styled.div`
  width: 400px;
  background: yellow;
`;

class _CheckouForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleOnSubmit = (ev, total) => {
    ev.preventDefault();
    document.getElementById('idDivError').innerText = '';

    if (this.props.stripe) {
      console.log('class -CardForm -::- Paying');
      this.props.stripe
        .createToken({ type: 'card', name: this.state.name })
        .then((payload) => {
          console.log('[el token]', payload);
          if (payload.error) {
            document.getElementById('idDivError').innerText =
              payload.error.message;
          } else {
            alert('Thank you for your payment ' + this.state.name);
            this.handleOnCancel(null);
          }
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  handleOnCancel = (ev) => {
    this.props.dispatch({
      type: 'SHOW_COMPONENT',
      componentToShow: 'items',
    });
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    let filteredOrder = this.props.order.order.filter(
      (o) => o.checked === true
    );
    return (
      <Wrapper>
        <form
          onSubmit={(ev) => this.handleOnSubmit(ev, this.props.order.total)}
        >
          <Table>
            <Caption>Order Summary</Caption>
            {filteredOrder.map((o, i) => (
              <tr key={'item' + i}>
                <TdLeft>{o.service.service}</TdLeft>
                <TdRight>{o.price}</TdRight>
              </tr>
            ))}
            <tr>
              <Th>Subtotal</Th>
              <TdRight>{this.props.order.subTotal}</TdRight>
            </tr>
            {this.props.order.taxesArray.map((tax, i) => (
              <tr key={'tax' + i}>
                <Th>
                  {tax.name}({tax.tax * 100}%)
                </Th>
                <TdRight>{tax.totalTax}</TdRight>
              </tr>
            ))}
            <tr>
              <Th>Total</Th>
              <TdRight>{this.props.order.total}</TdRight>
            </tr>
          </Table>
          <h3>by {this.props.order.dresser.name}</h3>

          <div>
            <h3>Name:</h3>
            <InputSign
              type="text"
              name="name"
              placehoder="Name as on credit card"
              required
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </div>
          <CardSection />
          <div style={{ color: 'red' }} id="idDivError" />
          <WrapperBtn>
            <Button>Make payment</Button>
            <Button onClick={(ev) => this.handleCancel(ev)}>Cancel</Button>
          </WrapperBtn>
        </form>
      </Wrapper>
    );
  }
}

let mapStateToProps = (state) => {
  return { order: state.order };
};

const CheckouForm = injectStripe(_CheckouForm);

export default connect(mapStateToProps)(CheckouForm);
