import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Top } from './components/pages/top'
import { About } from './components/pages/about'

export default () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Top} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  )
}
