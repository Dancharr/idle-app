import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'

import '../../../App.css'

class Node extends Component {

  constructor(props){
    super(props)
    this.styles = StyleSheet.create({
        node : {
            borderRadius : '50%',
            backgroundColor: '#4CAF50',
            width : '20px',
            height : '20px',
            left : props.x,
            top : props.y,
            position: 'relative',
            ':active' : {
                backgroundColor: 'red',
            },
            userSelect: 'none',
            float: 'left',
    
        }
    
    });
  }
  click = () => {
      
  }

  componentWillMount(){
    
  }

  render() {
    return (
        <div className = {css(this.styles.node)}/>
    );
  }

  
}

export default Node;