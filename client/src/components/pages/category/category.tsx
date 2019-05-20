import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { DefaultTemplate } from '../../templates/default-template'

const Category: React.FC = (props: any) => {
  return <Redirect to="/" />
}

export default Category
