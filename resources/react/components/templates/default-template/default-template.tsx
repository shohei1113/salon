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
  isDefaultSpace: boolean
  history?: any
  children?: React.ReactNode
}

const DefaultTemplate: React.FC = (props: Props) => {
  const { isDefaultSpace } = props
  const { isLoading } = useMappedState(React.useCallback(state => state.ui, []))

  return (
    <>
      <Header />
      <Content isDefaultSpace={isDefaultSpace}>{props.children}</Content>
      <Navigation history={props.history} />
      <Footer />
      <Snackbar />
      <Modal />
      {isLoading && <Loader />}
    </>
  )
}

const Content = styled.div<{ isDefaultSpace: boolean }>`
  padding: ${({ isDefaultSpace }) =>
    isDefaultSpace ? '40px 0 80px' : '0 0 80px'};
`

export default DefaultTemplate
