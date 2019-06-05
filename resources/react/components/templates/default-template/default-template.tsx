import React from 'react'
import styled from 'styled-components'
import { Header } from '../../organisms/header'
import { Navigation } from '../../organisms/navigation'
import { Footer } from '../../organisms/footer'

interface Props {
  history?: any
  children?: React.ReactNode
}

const DefaultTemplate: React.FC = (props: Props) => {
  return (
    <>
      <Header />
      <Content>{props.children}</Content>
      <Navigation history={props.history} />
      <Footer />
    </>
  )
}

const Content = styled.div`
  padding-bottom: 40px;
`

export default DefaultTemplate
