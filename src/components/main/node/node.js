import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'
import LineTo from 'react-lineto';

import '../../../App.css'

class Node extends Component {

  constructor(props){
    super(props)
    this.styles = StyleSheet.create({
        node : {
            borderRadius : '50%',
            width : '20px',
            height : '20px',
            left : props.x,
            top : props.y,
            position: 'relative',
            userSelect: 'none',
            float: 'left',
        },
        active : {
            backgroundColor: '#166ffc',
        },
        inactive : {
            backgroundColor: '#27477a',
        }

    
    });
    this.state = {
        status : "inactive",
        lineColour : "#545654",
    }
  }
  click = () => {
      if(this.state.status == "inactive"){
        this.setState({status : "active"});
        this.setState({lineColour : "#3ed84b"});     
      }
      if(this.state.status == "active"){
        this.setState({status : "inactive"});
        this.setState({lineColour : "#545654"});
      }
      
  }

  componentWillMount(){
    
  }

  divStyle = {
    left: '50%',
    top : '50%',
    marginTop: '-0.15em',
    width: '0px',
    height: '0px',
    position: 'relative',

  };
  render() {
    return (
        <div onClick={() => this.click()} className = {css(this.styles.node, this.styles[this.state.status])}>
            <div className = {this.props.name} style={this.divStyle}/>
            <LineTo from={this.props.parent} to={this.props.name} zIndex={-1} borderWidth={'0.3em'} borderColor={this.state.lineColour}/>
        </div>
    );
  }

  
}

export default Node;