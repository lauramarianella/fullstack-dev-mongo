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
  Caption,
  Th,
  TdCenter,
  TdRight,
  TdLeft,
  TrEven,
  TFoot,
  DivError,
} from './components';

const Table = styled.table`
  padding: 10px 0px 0px 50px;
  margin: 0; /* margin: auto; */
  width: 400px;
  border-collapse: collapse;
`;
const Wrapper = styled.div`
  width: 400px;
  background: var(--bg-content-color);
`;

class _CheckouForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleOnSubmit = async (ev, total) => {
    ev.preventDefault();
    document.getElementById('idDivError').innerText = '';

    if (this.props.stripe) {
      console.log('class -CardForm -::- Paying');
      let payload = await this.props.stripe.createToken({
        type: 'card',
        name: this.state.name,
      });
      // .then((payload) => {
      //   console.log('[el token]', payload);
      if (payload.error) {
        document.getElementById('idDivError').innerText = payload.error.message;
        return;
      }
      console.log(payload);
      let formData = new FormData();
      formData.append('idToken', payload.token.id);
      formData.append('amount', this.props.order.total);
      let response = await fetch('/billing/pay', {
        method: 'POST',
        // headers: { 'Content-type': 'application/json' },
        body: formData /*JSON.stringify({ payload, total }),*/,
        credentials: 'include',
      });
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      if (!body.success) {
        alert('Payment failed');
        return;
      }
      alert('Thank you for your payment ' + this.state.name);
      this.handleOnCancel(null);

      // });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  handleCancel = (ev) => {
    this.props.dispatch({
      type: 'SHOW_COMPONENT',
      componentToShow: 'itemDetails',
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
            <tbody>
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
            </tbody>
          </Table>
          <span>
            <b>{this.props.order.dresser.name} will be at your service!!!</b>
          </span>
          <div>
            <h3>Name:</h3>
            <InputSign
              type="text"
              name="name"
              placehoder="Name as on credit card"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <CardSection />
          <DivError id="idDivError" />
          <WrapperBtn>
            <Button>Make payment</Button>
          </WrapperBtn>
        </form>
        <WrapperBtn>
          <Button onClick={this.handleCancel}>Cancel</Button>
        </WrapperBtn>
      </Wrapper>
    );
  }
}

let mapStateToProps = (state) => {
  return { order: state.order };
};

const CheckouForm = injectStripe(_CheckouForm);

export default connect(mapStateToProps)(CheckouForm);
