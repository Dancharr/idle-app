import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'

import Main from '../main'
import Node from '../node/node'
import LineTo from 'react-lineto';

import '../../../App.css'

class Home extends Component {

  constructor(props){
    super(props);
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
    A : {
      x : '50px',
      y : '50px',

    },
    B : {
      x : '100px',
      y : '100px',
    },
    C: {
      x : '100px',
      y : '200px',
    },
  }


  

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
            
            <svg width='100%' height='100%'>
            <Node tree={this.tree} parent={'A'} name={'A'} child={true}/>
            <Node tree={this.tree} parent={'A'} name={'B'} child={false}/>
            
            {/* <Node tree={this.tree} name = {"C"} x = {'320px'} y = {'128px'}/>
            <Node tree={this.tree} name = {"D"} x = {'400px'} y = {'253px'}/>
            <Node tree={this.tree} name = {"E"} x = {'450px'} y = {'500px'}/>
            <Node tree={this.tree} name = {"F"} x = {'650px'} y = {'600px'}/> */}
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
  }
});

export default Home;