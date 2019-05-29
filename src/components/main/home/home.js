import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'

import Node from '../node/node'

import '../../../App.css'

class Home extends Component {

  constructor(props){
    super(props);

    // this.state = {
    //   root : '',
    //   acceleratedFlow : '#545654',
    //   golems : '',

    // }
    this.state = {
      edges : {
        root : <line/>,
          acceleratedFlow : <line/>,
          golems : <line/>,
            elementals : <line/>,
      }
    }
    
  }

  renderCosts(costs){
    return Object.keys(costs).map((obj) => {
        return (
            <div>
                {obj} : {costs[obj].toFixed(2)} 
            </div>
        )
    });
  }
  tree = {
    root: {
      x : '50px',
      y : '50px',
      children : {
        acceleratedFlow : {
          x : '100px',
          y : '100px',
          children : {},
        },
        golems: {
          x : '100px',
          y : '200px',
          children : {
            elementals : {
              x : '250px',
              y : '300px',
              children : {},
            }
          },
        },
        
      },
    },
  }

  setEdge = (node, x_1, y_1, x_2, y_2, status) => {
    this.setState((state) => {
      let temp = {
        edges : {
          ...state.edges,
          [node] : <line x1={x_1} y1={y_1} x2={x_2} y2={y_2} className={css(styles.edge, styles[status])}/>
        }
      }
      return temp;
    });
  }

  renderEdges = () => {
    return Object.keys(this.state.edges).map((obj) => {
      return (this.state.edges[obj]);
    })
  }

  nodeProps = { render : this.setEdge, func : this.props.tree, tree : this.tree.root}

  

  render() {
    return (
        <div className={css(styles.column)}>
          <h2>Home</h2>
          <div className={css(styles.button)} onClick={() => this.props.click("iru")}>Cultivate Iru</div>

          <div 
            className={css(styles.button)} 
            onClick={() => this.props.click("harvester")} 
            // data-tip data-for='harvesterCost'
            >
              Build Iru Harvester [{this.props.main.harvester.num}]
              {this.renderCosts(this.props.main.harvester.costs)}
          </div>
          {/* <ReactTooltip id='harvesterCost' type='error'>
            <span>{this.props.main.harvester.costs}</span>
          </ReactTooltip> */}

          <div 
            className={css(styles.button)} 
            onClick={() => this.props.click("woodGolem")} 
            // data-tip data-for='woodGolemCost'
            >
              Build Wooden Golem [{this.props.main.woodGolem.num}]
              {this.renderCosts(this.props.main.woodGolem.costs)}
          </div>
          {/* <ReactTooltip id='woodGolemCost' type='error'>
            <span>{this.props.main.woodGolem.costs}</span>
          </ReactTooltip> */}
          <div 
            className={css(styles.button)} 
            onClick={() => this.props.click("stoneGolem")} 
            // data-tip data-for='woodGolemCost'
            >
              Build Stone Golem [{this.props.main.stoneGolem.num}]
              {this.renderCosts(this.props.main.stoneGolem.costs)}
          </div>
          <div className={css(styles.skillTree)}>
            <div>
            </div>
            
            <svg width='100%' height='100%' className={css(styles.skillTreeSVG)}>
              {this.renderEdges()}
              <Node {...this.nodeProps} name={'root'} parentX={'50px'} parentY={'50px'} parentStatus={'active'}/>
            </svg> 
          </div>
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
  },
  skillTree : {
    height : '5000px',
    width : '5000px',
    userSelect : 'none',
    position: 'absolute',
  },
  column : {
    float: 'left',
    height: '100%',
    width: '100%',
    border: '2px',
    borderColor: 'black',
    borderStyle: 'solid',
    position: 'relative',
    overflow: 'scroll',
  },
  skillTreeSVG : {
  },
  edge : {
    strokeWidth : '3',
  },
  inactive : {
    stroke: '#545654',
  },
  active : {
    stroke: '#f2ae30',
  },
});

export default Home;