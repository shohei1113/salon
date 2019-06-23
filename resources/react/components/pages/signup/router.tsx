import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signup from './signup'
import { Complete } from './complete'

export default () => {
  return (
    <>
      <Route path="/signup" exact component={Signup} />
      <Route path="/signup/complete" exact component={Complete} />
    </>
  )
}
