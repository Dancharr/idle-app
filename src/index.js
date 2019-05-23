import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Contact from './components/contact/contact'
import Main from './components/main/main'
import Notfound from './notfound'
const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/main">Main</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/contact" component={Contact} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))