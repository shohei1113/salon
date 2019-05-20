import React from 'react'
import { withRouter } from 'react-router-dom'
import { DefaultTemplate } from '../../templates/default-template'

const About: React.FC = (props: any) => {
  return (
    <DefaultTemplate {...props}>
      <div>abfout</div>
    </DefaultTemplate>
  )
}

export default withRouter(About)
