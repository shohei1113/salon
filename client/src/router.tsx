import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Top } from './components/pages/top'
import { About } from './components/pages/about'
import { Category } from './components/pages/category'
import { Management } from './components/pages/category/management'

export default () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Top} />
        <Route path="/about" component={About} />
        <Route path="/category" exact component={Category} />
        <Route path="/category/management" component={Management} />
      </div>
    </Router>
  )
}
