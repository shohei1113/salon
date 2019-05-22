import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Top } from './components/pages/top'
import { Category } from './components/pages/category'
import { Management } from './components/pages/category/management'
import { Detail } from './components/pages/category/detail'

export default () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Top} />
        <Route path="/category" exact component={Category} />
        <Route path="/category/management" exact component={Management} />
        <Route path="/category/detail/:salonId" component={Detail} />
      </div>
    </Router>
  )
}
