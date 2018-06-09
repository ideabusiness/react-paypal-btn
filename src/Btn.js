import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import paypal from 'paypal-checkout';
import PropTypes from 'prop-types';

const PaypalBtn = paypal.Button.driver('react', { React, ReactDOM });

export default class Btn extends Component {
  static propTypes = {
    currency: PropTypes.string,
    description: PropTypes.string,
    experience: PropTypes.object,
    onAuthorize: PropTypes.func,
    onError: PropTypes.func,
    sandbox: PropTypes.bool,
    secret: PropTypes.string.isRequired,
    style: PropTypes.object,
    total: PropTypes.number.isRequired
  };

  static defaultProps = {
    currency: 'USD',
    description: undefined,
    experience: { input_fields: { no_shipping: 1 } },
    onAuthorize: () => null,
    onError: () => null,
    sandbox: false,
    style: { size: 'responsive' /* , tagline: false */ }
  };

  render() {
    const {
      currency,
      description,
      experience,
      onAuthorize,
      onError,
      sandbox,
      secret,
      style,
      total,
      ...rest
    } = this.props;

    const env = sandbox ? 'sandbox' : 'production';

    const client = { [env]: secret };

    const opts = {
      client,

      commit: true,

      env,

      onAuthorize: (data, actions) =>
        actions.payment
          .execute()
          .then(onAuthorize)
          .catch(onError),

      onError,

      payment: () =>
        paypal.rest.payment.create(env, client, {
          payment: {
            transactions: [{ amount: { total, currency }, description }]
          },

          experience
        }),

      style,

      ...rest
    };

    return <PaypalBtn {...opts} />;
  }
}
