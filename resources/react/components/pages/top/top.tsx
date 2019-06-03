import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import COLOR from '../../../const/color'
import { DefaultTemplate } from '../../templates/default-template'
import Hero from './hero'
import Category from './category'

const Top: React.FC = (props: any) => {
  return (
    <DefaultTemplate {...props}>
      <Hero />
      <Content>
        <Category />
      </Content>
    </DefaultTemplate>
  )
}

const Content = styled.div`
  margin: 0 20px;
`

export default withRouter(Top as any)
