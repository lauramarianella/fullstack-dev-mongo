import React from 'react';
import { CardElement } from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        <h3>Card details</h3>
        <CardElement style={{ base: { fontSize: '18px' } }} />
        <br />
      </label>
    );
  }
}

export default CardSection;
