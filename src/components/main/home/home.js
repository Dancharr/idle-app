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
  render() {
    return (
        <div className="column">
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
            <Node className="A" x = {'1%'} y = {'2%'}/>
            <Node className="B" x = {'5%'} y = {'2%'}/>
            <LineTo from="A" to="B" />
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
    height : '50%'
  }
});

export default Home;