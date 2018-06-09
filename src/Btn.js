import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import paypal from 'paypal-checkout';
import PropTypes from 'prop-types';

const PaypalBtn = paypal.Button.driver('react', { React, ReactDOM });

export default class Btn extends Component {
  static propTypes = {
    currency: PropTypes.string,
    description: PropTypes.string.isRequired,
    env: PropTypes.oneOf(['sandbox', 'production']),
    experience: PropTypes.object,
    onAuthorize: PropTypes.func,
    onError: PropTypes.func,
    payment: PropTypes.object,
    secret: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
  };

  static defaultProps = {
    currency: 'USD',
    env: 'sandbox',
    experience: { input_fields: { no_shipping: 1 } },
    onAuthorize: () => null,
    onError: () => null,
    payment: {}
  };

  render() {
    const {
      currency,
      description,
      env,
      experience,
      onAuthorize,
      onError,
      payment,
      secret,
      total,
      ...rest
    } = this.props;

    const client = { [env]: secret };

    const opts = {
      client,

      commit: true,

      env,

      onAuthorize: (data, actions) =>
        actions.payment
          .execute()
          .then(res => onAuthorize(res))
          .catch(err => onError(err)),

      onError,

      payment: () =>
        paypal.rest.payment.create(env, client, {
          payment: {
            transactions: [{ amount: { total, currency }, description }],
            ...payment
          },

          experience
        }),

      ...rest
    };

    return <PaypalBtn {...opts} />;
  }
}
