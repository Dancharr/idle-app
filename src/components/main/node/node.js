import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Tooltip } from 'react-svg-tooltip';

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
    this.nodeProps = { render : this.props.render, func : this.props.func, parentX : this.props.tree.x, parentY : this.props.tree.y}
    this.myRef = React.createRef();
  }

  init = async() => {
    if(this.props.name in localStorage){
      await this.setState(() => {
        return JSON.parse(localStorage.getItem(this.props.name));
      }); 
    }
    // this.updateNode();
    this.props.render(this.props.name, this.props.tree.x, this.props.tree.y, this.props.parentX, this.props.parentY, this.state.status);
  }

  componentDidMount(){
    this.init()
  };

  updateNode = () => {
    if(this.state.status === "inactive"){
      this.setState({status : "active"});
      this.setState({fillColour : "#00e5ff"});     
    }
    if(this.state.status === "active"){
      this.setState({status : "inactive"});
      this.setState({fillColour : "#27477a"}); 
    }
  }

  click = async() => {
    if(this.props.parentStatus == "active"){
    
    this.props.func[this.props.name].effects.forEach(fn =>fn());
    await this.updateNode();
    
    this.props.render(this.props.name, this.props.tree.x, this.props.tree.y, this.props.parentX, this.props.parentY, this.state.status);
    localStorage.setItem(this.props.name, JSON.stringify(this.state));
    }
  }

  componentWillMount(){
    
  }

  renderChildren = () => {
    return Object.keys(this.props.tree.children).map((node) => {
      return (<Node {...this.nodeProps} tree={this.props.tree.children[node]} name={node} parentStatus={this.state.status}/>);
    })
  }

  render() {
    return (
      <g>
          <circle
            ref={this.myRef}
            className={css(this.styles.node)} 
            onClick={() => this.click()} 
            cx={this.props.tree.x} 
            cy={this.props.tree.y} 
            r="10" 
            fill={this.state.fillColour}
          />
          <Tooltip triggerRef={this.myRef}>
            <rect x={20} y={20} width={200} height={50} rx={5} ry={5} fill='#42d4f4'/>
            <text x={45} y={50} fontSize={20} fill='black'>{this.props.name}</text>
          </Tooltip>
          {this.renderChildren()}
      </g>
          
    );
  }

  
}

export default Node;