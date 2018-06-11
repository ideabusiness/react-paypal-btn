# react-paypal-btn

[![npm version](https://badge.fury.io/js/react-paypal-btn.svg)](https://badge.fury.io/js/react-paypal-btn)

## Installation

`yarn add paypal-checkout react-paypal-btn`

## Usage

```js
import PaypalBtn from 'react-paypal-btn';

<PaypalBtn
  onAuthorize={res => console.log(res)}
  onError={err => console.error(err.message)}
  secret="SECRET"
  total={10}
  // see example for more props
/>;
```

## Example

Available [here](https://github.com/sonaye/react-paypal-btn/tree/master/src/example).
