import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Salon from './salon'
import { Register } from './register'
import { Member } from './member'

export default () => {
  return (
    <>
      <Route path="/salon" exact component={Salon} />
      <Route path="/salon/register" exact component={Register} />
      <Route path="/salon/member" exact component={Member} />
    </>
  )
}
