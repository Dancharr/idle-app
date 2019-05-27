import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'
import LineTo from 'react-lineto';

import '../../../App.css'

class Node extends Component {

  constructor(props){
    super(props)
    // this.styles = StyleSheet.create({
    //     node : {
    //         borderRadius : '50%',
    //         width : '20px',
    //         height : '20px',
    //         left : props.x,
    //         top : props.y,
    //         position: 'relative',
    //         userSelect: 'none',
    //         float: 'left',
    //     },
    //     active : {
    //         backgroundColor: '#166ffc',
    //     },
    //     inactive : {
    //         backgroundColor: '#27477a',
    //     }
    // });

    this.styles = StyleSheet.create({
        node : {
            userSelect: 'none',
        },
        active : {
            stroke: '#3ed84b',
        },
        inactive : {
            stroke: '#545654',
        },
        edge : {
          strokeWidth : '3',
          zIndex : '-1',
        }

    
    });

    this.state = {
        status : "inactive",
        fillColour : '#27477a',
        lineColour : "#545654",
    }
    this.myRef = React.createRef();
  }
  click = () => {
      if(this.state.status === "inactive"){
        this.setState({status : "active"});
        this.setState({fillColour : "#166ffc"}); 
        this.setState({lineColour : "#3ed84b"});     
      }
      if(this.state.status === "active"){
        this.setState({status : "inactive"});
        this.setState({fillColour : "#27477a"}); 
        this.setState({lineColour : "#545654"});
      }
      console.log(this.myRef.current.offsetTop); 
      console.log(this.myRef.current); 
      
  }

  renderChild = () => {
    if(this.props.child){
      return <Node tree={this.props.tree} parent={'A'} name={'C'} child={false}/>
    }
  }

  componentWillMount(){
    
  }

  render() {
    return (
        <g>
          <line 
            x1={this.props.tree[this.props.name].x} 
            y1={this.props.tree[this.props.name].y} 
            x2={this.props.tree[this.props.parent].x} 
            y2={this.props.tree[this.props.parent].y} 
            className={css(this.styles.edge, this.styles[this.state.status])}
          />
          <circle
            ref={this.myRef} 
            className={css(this.styles.node)} 
            onClick={() => this.click()} 
            cx={this.props.tree[this.props.name].x} 
            cy={this.props.tree[this.props.name].y} 
            r="10"
            fill={this.state.fillColour}
          />
          {this.renderChild()};
        </g>
    );
  }

  
}

export default Node;