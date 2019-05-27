import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip'


import Home from './home/home'
import Forest from './forest/forest'
import Mine from './mine/mine'

import '../../App.css'

class Main extends Component {
  constructor(props){
    super(props);

    // =============================
    // Default state of resources
    // =============================
    this.baseState = {
      iru : {
        id : "iru",
        num : 0,
        costs : {
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
          iru : 10,
        },
        ratio : 1,
        gainBase : {
          woodGolem : 0,
        },
        gainMulti : {},
      },

      stone : {
        id : "stone",
        num : 0,
        costs : {
          iru : 20,
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
          iru : 15,
        },
        ratio : 1.20,
        gainBase : {},
        gainMulti : {},
      },

      woodGolem : {
        id : "woodGolem",
        num : 0,
        costs : {
          wood : 5,
        },
        ratio : 1.5,
        efficiency : 1,

        available: 0,
        location : {
          forest : 0,
          mine : 0,
        }
      },

      stoneGolem : {
        id : "stoneGolem",
        num : 0,
        costs : {
          stone : 10,
        },
        ratio : 1.5,
        efficiency : 5,

        available: 0,
        location : {
          forest : 0,
          mine : 0,
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
    stone : [],
    harvester : [
      () => {
        this.updateGain("iru", "harvester", this.state.harvester.num * 0.6, true);
      },
    ],
    woodGolem : [
      () => {
        this.updateGeneric("woodGolem", "available", 1);
      }
    ],  
    stoneGolem : [
      () => {
        this.updateGeneric("stoneGolem", "available", 1);
      }
    ]
  }



  reset = () => {
    localStorage.clear();
    this.setState(() => {
      return this.baseState;
    });
  }

  assignGolem = async(where, golem, amount) => {
    if(this.state[golem].available >= amount && this.state[golem].location[where] >= -amount){
      this.updateGeneric2(golem, "location", where, amount);
      await this.updateGeneric(golem, "available", -amount);

      let gather;
      if(where == "forest"){gather = "wood"}
      else if (where == "mine"){gather = "stone"}
      this.updateGain(gather, golem, this.state[golem].location[where] * this.state[golem].efficiency, true);
    }
    
  }

  render() {
    return (
        <div className={css(styles.rootContainer)}>
          
          <h2>Main works</h2>
          <ul>
              <li>
                <Link to="/main">Home</Link>
              </li>
              <li>
                <Link to="/main/forest">Forest</Link>
              </li>
              <li>
                <Link to="/main/mine">Mine</Link>
              </li>
          </ul>
          
          <div className={css(styles.column)}>
            <div className={css(styles.button)} onClick={() => this.reset()}>reset</div>
            <div>Iru: {this.state.iru.num.toFixed(2)} [{this.calculateTotalGain("iru").toFixed(2)}/s]</div>
            <div>Wood: {this.state.wood.num.toFixed(2)} [{this.calculateTotalGain("wood").toFixed(2)}/s]</div>
            <div>Stone: {this.state.stone.num.toFixed(2)} [{this.calculateTotalGain("stone").toFixed(2)}/s]</div>
            <div>Wood Golem: {this.state.woodGolem.available}/{this.state.woodGolem.num}</div>
            <div>Stone Golem: {this.state.stoneGolem.available}/{this.state.stoneGolem.num}</div>
            <div>=============================</div>
            <div>Forest: {this.state.woodGolem.location.forest}</div>

            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("forest", "woodGolem", 1)}>
              wood: assign to forest
            </div>
            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("forest", "stoneGolem", 1)}>
              stone: assign to forest
            </div>

            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("forest", "woodGolem", -1)}>
              wood: back home
            </div>
            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("forest", "stoneGolem", -1)}>
              stone: back home
            </div>
            <div>Mine: {this.state.woodGolem.location.mine}</div>
            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("mine", "woodGolem", 1)}>
              wood: assign to mine
            </div>

            <div 
            className={css(styles.button)} 
            onClick={() => this.assignGolem("mine", "woodGolem", -1)}>
              wood: back home
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
              <Route 
                path="/main/mine" 
                render={(props) => <Mine {...props} 
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
      this.updateNum(key, this.state[key].num + this.calculateTotalGain(key) * 0.1);
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
          num : amount
        }
      }
      return temp;
    });
  }

  updateCost = (resource, amount) => {
    let newCosts = this.state[resource].costs;
    for(let key in this.state[resource].costs){
      newCosts[key] = this.state[resource].costs[key] * amount;
    }
    this.setState((state) => {
      let temp = {
        [resource] : {
          ...state[resource],
          costs : newCosts
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
              [source] : amount
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
              [source] : state[resource].gainMulti[source] + amount
            }
          }
        }
        return temp;
      });
    }
  }

  click = async(resource) => {
    for(let key in this.state[resource].costs){
      if(this.state[resource].costs[key] > this.state[key].num){return;}
    }
    this.updateNum(resource, this.state[resource].num + 1);
    for(let key in this.state[resource].costs){
      this.updateNum(key, this.state[key].num - this.state[resource].costs[key]);
    }
    await this.updateCost(resource, this.state[resource].ratio);
    this.effects[resource].forEach(fn => fn());
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
  },
  rootContainer : {
    height : 'auto',
    width : '98vw',
    padding: '1.3em',
    display: 'grid',
    gridTemplateColumns: '30% auto',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  column : {
    float: 'left',
    height: '50%',
    width: '50%',
    border: '2px',
    borderColor: 'black',
    borderStyle: 'solid',
  }
});

export default Main;