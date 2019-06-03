import React from 'react'
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
      {props.children}
      <Navigation history={props.history} />
      <Footer />
    </>
  )
}

export default DefaultTemplate
