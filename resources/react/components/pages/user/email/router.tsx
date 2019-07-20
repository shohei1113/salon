import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Email from './email'
import { Complete } from './complete'

export default () => {
  return (
    <>
      <Route path="/user/email" exact component={Email} />
      <Route path="/user/email/complete" component={Complete} />
    </>
  )
}
