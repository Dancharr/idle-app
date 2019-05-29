import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import '../../../App.css'
import { async } from 'q';

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
        },
        test : {
          zIndex : '-2',
        }

    
    });
    

    this.state = {
        status : "inactive",
        fillColour : "#27477a",
    }

    if(this.props.tree[this.props.name].active){
      this.setState({status : "active"})
    } 
    
  }

  debug = () => {
    console.log(this.state.status);
    debugger;
  }

  init = async() => {
    if(this.props.name in localStorage){
      await this.setState(() => {
        return JSON.parse(localStorage.getItem(this.props.name));
      }); 
    }
    this.props.render(this.props.name, this.props.tree[this.props.name].x, this.props.tree[this.props.name].y, this.props.tree[this.props.parent].x, this.props.tree[this.props.parent].y, this.state.status)
  }

  componentDidMount(){
    this.init()
  };

  updateNode = () => {
    if(this.state.status === "inactive"){
      this.setState({status : "active"});
      this.setState({fillColour : "#00e1ff"}); 
      this.setState({lineColour : "#3ed84b"});     
    }
    if(this.state.status === "active"){
      this.setState({status : "inactive"});
      this.setState({fillColour : "#27477a"}); 
      this.setState({lineColour : "#545654"});
    }
  }

  click = async() => {
    this.props.func[this.props.name].effects.forEach(fn =>fn());
    await this.updateNode();
    this.props.render(this.props.name, this.props.tree[this.props.name].x, this.props.tree[this.props.name].y, this.props.tree[this.props.parent].x, this.props.tree[this.props.parent].y, this.state.status);
    localStorage.setItem(this.props.name, JSON.stringify(this.state));
  }

  componentWillMount(){
    
  }

  render() {
    return (
          <circle 
            ref={this.myRef} 
            className={css(this.styles.node)} 
            onClick={() => this.click()} 
            cx={this.props.tree[this.props.name].x} 
            cy={this.props.tree[this.props.name].y} 
            r="10" 
            fill={this.state.fillColour}
          />
    );
  }

  
}

export default Node;