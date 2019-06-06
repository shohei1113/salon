import React from 'react'
import { useMappedState } from 'redux-react-hook'
import styled from 'styled-components'
import { Header } from '../../organisms/header'
import { Navigation } from '../../organisms/navigation'
import { Footer } from '../../organisms/footer'
import { Snackbar } from '../../organisms/snackbar'
import { Modal } from '../../organisms/modal'
import { Loader } from '../../organisms/loader'

interface Props {
  history?: any
  children?: React.ReactNode
}

const DefaultTemplate: React.FC = (props: Props) => {
  const { isLoading } = useMappedState(React.useCallback(state => state.ui, []))

  return (
    <>
      <Header />
      <Content>{props.children}</Content>
      <Navigation history={props.history} />
      <Footer />
      <Snackbar />
      <Modal />
      {isLoading && <Loader />}
    </>
  )
}

const Content = styled.div`
  padding-bottom: 40px;
`

export default DefaultTemplate
