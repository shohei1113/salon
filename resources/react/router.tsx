import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ScrollToTop } from './components/utils/scroll-to-top'
import { Top } from './components/pages/top'
import { Login } from './components/pages/login'
import { Category } from './components/pages/category'
import { Management } from './components/pages/category/management'
import { Detail } from './components/pages/category/detail'

export default () => {
  return (
    <Router>
      <ScrollToTop>
        <Route path="/" exact component={Top} />
        <Route path="/login" exact component={Login} />
        <Route path="/category" exact component={Category} />
        <Route path="/category/management" exact component={Management} />
        <Route path="/category/detail/:salonId" component={Detail} />
      </ScrollToTop>
    </Router>
  )
}
