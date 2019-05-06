import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Top } from './components/pages/top'
import { About } from './components/pages/about'

export default () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Top} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  )
}
