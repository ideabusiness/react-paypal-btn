import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import paypal from 'paypal-checkout';
import styled from 'styled-components';

const PaypalButton = paypal.Button.driver('react', { React, ReactDOM });

export default class App extends Component {
  state = { status: 'READY', res: null };

  render() {
    const opts = {
      env: 'sandbox', // production

      client: {
        sandbox:
          'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL',
        production:
          'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl'
      },

      payment() {
        const { env, client } = this.props;

        return paypal.rest.payment.create(env, client, {
          payment: {
            transactions: [
              {
                amount: { total: '10.00', currency: 'USD' } // SAR
              }
            ]
          },

          experience: {
            input_fields: { no_shipping: 1 }
          }
        });
      },

      commit: true,

      onAuthorize: (data, actions) => {
        actions.payment
          .execute()
          .then(res => this.setState({ status: 'AUTHORIZED', res }))
          .catch(err => this.setState({ status: 'ERROR', res: err.message }));
      },

      onCancel: res => {
        this.setState({ status: 'CANCELED', res });
      },

      onError: err => {
        this.setState({ status: 'ERROR', res: err.message });
      },

      // locale: 'ar_SA'

      style: {
        size: 'medium' // small, medium, large
        // color: 'blue' // gold, blue, silver, black
        // label: 'paypal',
        // tagline: false
      }
    };

    const { res } = this.state;

    return (
      <Container>
        <PaypalButton {...opts} />

        {res && <Res>{JSON.stringify(this.state, null, 2)}</Res>}
      </Container>
    );
  }
}

const Container = styled.div`
  align-items: center;
  background-color: #f5fcff;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const Res = styled.pre`
  color: #333;
  margin-top: 10px;
`;
