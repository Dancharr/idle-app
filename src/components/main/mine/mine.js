import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'

import '../../../App.css'

class Mine extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    
  }

  render() {
    return (
        <div className = "column">
          <h2>mine</h2>
          <div className={css(styles.button)} onClick={() => this.props.click("wood")}>Gather Wood</div>
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
    fontSize: '16px',
    userSelect: 'none',
  }
});

export default Mine;