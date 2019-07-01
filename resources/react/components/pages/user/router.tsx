import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Info } from './info'
import { Password } from './password'
import { Salon } from './salon'

export default () => {
  return (
    <>
      <Route path="/user/info" exact component={Info} />
      <Route path="/user/password" exact component={Password} />
      <Route path="/user/salon" exact component={Salon} />
    </>
  )
}
