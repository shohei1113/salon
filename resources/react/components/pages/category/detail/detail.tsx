import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { DefaultTemplate } from '../../../templates/default-template'

interface Props extends RouteComponentProps<{ salonId: string }> {
  // history: any
  // children: React.ReactElement
}

const Detail: React.FC<Props> = (props: Props) => {
  console.log(props.match)
  return (
    <DefaultTemplate {...props}>{props.match.params.salonId}</DefaultTemplate>
  )
}

export default withRouter(Detail)
