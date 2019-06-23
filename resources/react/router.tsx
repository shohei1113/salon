import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ScrollToTop } from './components/utils/scroll-to-top'
import { Top } from './components/pages/top'
import { Login } from './components/pages/login'
import { Signup } from './components/pages/signup'
import { Register } from './components/pages/register'
import { Salons } from './components/pages/salons'
import { Salon } from './components/pages/salon'

export default () => {
  return (
    <Router>
      <ScrollToTop>
        <Route path="/" exact component={Top} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/register" exact component={Register} />
        <Route path="/salons" component={Salons} />
        <Route path="/salon" component={Salon} />
      </ScrollToTop>
    </Router>
  )
}
