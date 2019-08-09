import React, { Component } from 'react';
import { connect } from 'react-redux';

import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';

//https://www.youtube.com/watch?v=dEahSdI7p7M

import { Button, WrapperBtn } from './components';

class _CheckouForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnSubmit = (ev, total) => {
    alert('++Shopping cart: ' + total);
    ev.preventDefault();

    if (this.props.stripe) {
      console.log('class -CardForm -::- Paying');
      this.props.stripe
        .createToken({ type: 'card', name: 'Jenny Rosen' })
        .then((payload) => console.log('[el token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <>
        <CardSection />
        <WrapperBtn>
          <Button
            onClick={(ev) => this.handleOnSubmit(ev, this.props.order.total)}
          >
            Check out
          </Button>
        </WrapperBtn>
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return { order: state.order };
};

const CheckouForm = injectStripe(_CheckouForm);

export default connect(mapStateToProps)(CheckouForm);
