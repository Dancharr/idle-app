import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'


import Home from './home/home'
import Forest from './forest/forest'

import '../../App.css'

class Main extends Component {
  constructor(props){
    super(props);
    this.baseState = {
      iru : {
        id : "iru",
        num : 0,
        costs : {
          names : ["iru"],
          val : [0]
        },
        ratio : 1,
        gainBase : {
          harvester : 0
        },
        gainMulti : {},
      },

      wood : {
        id : "wood",
        num : 0,
        costs : {
          names : ["iru"],
          val : [10]
        },
        ratio : 1,
        gainBase : {
          woodGolem : 0,
        },
        gainMulti : {},
      },

      harvester : {
        id : "harvester",
        num : 0,
        costs : {
          names : ["iru"],
          val : [15]
        },
        ratio : 1.20,
        gainBase : {},
        gainMulti : {},
      },

      woodGolem : {
        id : "woodGolem",
        num : 5,
        costs : {
          names : ["wood"],
          val : [5]
        },
        ratio : 1.5,
        gainBase : {},
        gainMulti : {},

        available: 5,
        location : {
          forest : 0,
        }
      },

    }
    this.state = this.baseState;
    
  }

  componentDidMount(){
    if("mainState" in localStorage){
      this.setState(() => {
        return JSON.parse(localStorage.getItem('mainState'));
      });
      
    }
    else{
      this.reset();
    }
    this.startTimer();
  };


  componentWillUnmount(){
    clearInterval(this.interval);
    
  }

  effects = {
    iru : [],
    wood : [],
    harvester : [
      () => {
        this.updateGain("iru", "harvester", 0.6, true);
      },
    ],
    woodGolem : [
      () => {
        this.updateGeneric("woodGolem", 1, "available");
      }
    ],  
  }

  // =============================
  // Default state of resources
  // =============================

  reset = () => {
    localStorage.clear();
    this.setState(() => {
      return this.baseState;
    });
  }

  assignGolem = (where, golem, amount) => {
    if(this.state[golem].available >= amount && this.state[golem].location[where] >= -amount){
      this.updateGeneric2(golem, "location", where, amount);
      this.updateGeneric(golem, "available", -amount);
    }
    
  }

  render() {
    return (
        <div className="container">
          
          <h2>Main works</h2>
          <ul>
              <li>
                <Link to="/main">Home</Link>
              </li>
              <li>
                <Link to="/main/forest">Forest</Link>
              </li>
          </ul>
          
          <div className="column">
            <div className={css(styles.button)} onClick={() => this.reset()}>reset</div>
            <div>Iru: {this.state.iru.num.toFixed(2)} [{this.calculateTotalGain("iru").toFixed(2)}/s]</div>
            <div>Wood: {this.state.wood.num} [{this.calculateTotalGain("wood").toFixed(2)}/s]</div>
            <div>Wood Golem: {this.state.woodGolem.available}/{this.state.woodGolem.num}</div>
            <div>=============================</div>
            <div>Forest: {this.state.woodGolem.location.forest}</div>

            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("forest", "woodGolem", 1)}>
              assign to forest
            </div>

            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("forest", "woodGolem", -1)}>
              back home
            </div>

            </div>
              <Route 
                exact path="/main"
                render={(props) => <Home {...props} 
                  click={this.click} 
                  main={this.state}/>}
              />
              <Route 
                path="/main/forest" 
                render={(props) => <Forest {...props} 
                  click={this.click}/>}
              />
            </div>
    );
  }

  calculateTotalGain(resource){
    let totalBase = 0, totalMulti = 1;
    for(let key in this.state[resource].gainBase){ 
      totalBase += this.state[resource].gainBase[key]
    }
    
    for(let key in this.state[resource].gainMulti){
      totalMulti += this.state[resource].gainMulti[key]
    }
    return totalBase * totalMulti;
  }

  tick(){
    for(let key in this.state){
      this.updateNum(key, this.calculateTotalGain(key) * 0.1);
    }
    localStorage.setItem('mainState', JSON.stringify(this.state));

  }

  updateGeneric = (resource, stat, amount) => {
    this.setState((state) => {
      let temp = {
        [resource] : {
          ...state[resource],
          [stat] : state[resource][stat] + amount
        }
      }
      return temp;
    });
  }
  updateGeneric2 = (resource, nest, stat, amount) => {
    this.setState((state) => {
      let temp = {
        [resource] : {
          ...state[resource],
          [nest] : {
            ...state[resource][nest],
            [stat] : state[resource][nest][stat] + amount
          }
        }
      }
      return temp;
    });
  }

  updateNum = (resource, amount) => {
    this.setState((state) => {
      let temp = {
        [resource] : {
          ...state[resource],
          num : state[resource].num + amount
        }
      }
      return temp;
    });
  }

  updateCost = (resource, amount) => {
    this.setState((state) => {
      let temp = {
        [resource] : {
          ...state[resource],
          costs : {
            ...state[resource].costs,
            val : state[resource].costs.val.map((number) => number * amount)
          }
        }
      }
      return temp;
    });
  }

  updateGain = (resource, source, amount, ifBase) => {
    if(ifBase){
      this.setState((state) => {
        let temp = {
          [resource] : {
            ...state[resource],
            gainBase : {
              ...state[resource].gainBase,
              [source] : this.state[resource].gainBase[source] + amount
            }
          }
        }
        return temp;
      });
    }
    else{
      this.setState((state) => {
        let temp = {
          [resource] : {
            ...state[resource],
            gainMulti : {
              ...state[resource].gainMulti,
              [source] : this.state[resource].gainMulti[source] + amount
            }
          }
        }
        return temp;
      });
    }
  }

  click = (resource) => {
    if(this.state[this.state[resource].costs.names[0]].num >= this.state[resource].costs.val[0]){
      this.updateNum(resource, 1);
      this.updateNum(this.state[resource].costs.names[0], -this.state[resource].costs.val[0]);
      this.updateCost(resource, this.state[resource].ratio);
      this.effects[resource].forEach(fn => fn());
    }
  }


  tickTimer = 100;
  interval;


  startTimer = () => {
    this.interval = setInterval(() => this.tick(), this.tickTimer);
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

export default Main;