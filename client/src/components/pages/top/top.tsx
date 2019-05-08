import React from 'react'
import { withRouter } from 'react-router-dom'
import { DefaultTemplate } from '../../templates/default-template'

const Top: React.FC = (props: any) => {
  return (
    <DefaultTemplate {...props}>
      <div>top</div>
    </DefaultTemplate>
  )
}

export default withRouter(Top)
