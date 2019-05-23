import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Contact extends Component {
  render() {
    return (
        <div>
          <h2>Contact</h2>
          <a className={css(styles.button)} href = "https://paypal.me/dancharr?locale.x=en_US">DONATE MINIMUM $20.00</a>
        </div>
    );
  }
}

const styles = StyleSheet.create({
  button : {
    ':hover': {
      backgroundColor : 'rgb(226, 241, 226)'
    },
    ':active': {
      backgroundColor : 'rgb(4, 187, 80)'
    },
    backgroundColor: 'white',
    border: '4px',
    borderStyle: 'solid',
    borderColor: 'black',
    color: 'black',
    padding: '15px 32px',
    margin: '5px',
    textAlign: 'center',
    textDecoration: 'none',
    display : 'inline-block',
    fontSize: '200px',
    userSelect: 'none',
  }
});

export default Contact;