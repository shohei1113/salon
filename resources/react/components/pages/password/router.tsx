import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Send } from './send'
import { Reset } from './reset'
import { Complete } from './complete'

export default () => {
  return (
    <>
      <Route path="/password/send" exact component={Send} />
      <Route path="/password/complete" exact component={Complete} />
      <Route path="/password/reset" exact component={Reset} />
    </>
  )
}
