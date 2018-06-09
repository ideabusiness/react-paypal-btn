import React, { Component } from 'react';

import styled from 'styled-components';

import PaypalBtn from './Btn';

export default class App extends Component {
  state = { status: 'READY', res: null };

  render() {
    return (
      <Container>
        <PaypalBtn
          // currency="SAR"
          // description="Invoice # 1"
          // locale="ar_SA"
          onAuthorize={res => this.setState({ status: 'AUTHORIZED', res })}
          onCancel={res => this.setState({ status: 'CANCELED', res })}
          onClick={() => console.log('CLICKED')}
          onError={err => this.setState({ status: 'ERROR', res: err.message })}
          // production
          secret="AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL"
          style={{ size: 'medium' /* , tagline: false */ }}
          total={10}
        />

        {this.state.res && <Res>{JSON.stringify(this.state, null, 2)}</Res>}
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
  overflow: auto;
  white-space: pre-wrap;
`;
