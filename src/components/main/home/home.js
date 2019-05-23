import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'

import Main from '../main'

import '../../../App.css'

class Home extends Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
        <div className="column">
          <h2>Home</h2>
          <div className={css(styles.button)} onClick={() => this.props.click("iru")}>Cultivate Iru</div>

          <div 
            className={css(styles.button)} 
            onClick={() => this.props.click("harvester")} 
            data-tip data-for='harvesterCost'>
              Build Iru Harvester [{this.props.main.harvester.num}]
          </div>
          <ReactTooltip id='harvesterCost' type='error'>
            <span>{this.props.main.harvester.costs.names}: {this.props.main.harvester.costs.val}</span>
          </ReactTooltip>

          <div 
            className={css(styles.button)} 
            onClick={() => this.props.click("woodGolem")} 
            data-tip data-for='woodGolemCost'>
              Build Wooden Golem [{this.props.main.woodGolem.num}]
          </div>
          <ReactTooltip id='woodGolemCost' type='error'>
            <span>{this.props.main.woodGolem.costs.names}: {this.props.main.woodGolem.costs.val}</span>
          </ReactTooltip>
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

export default Home;