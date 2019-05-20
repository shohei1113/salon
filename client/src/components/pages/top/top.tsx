import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import COLOR from '../../../const/color'
import { DefaultTemplate } from '../../templates/default-template'
import { Album } from '../../molecules/album'
import Hero from './hero'
import Category from './category'

const Top: React.FC = (props: any) => {
  return (
    <DefaultTemplate {...props}>
      <Hero />
      <Category />
      {/* <Album /> */}
    </DefaultTemplate>
  )
}

// const Hero = styled.div`
//   position: relative;
//   height: 500px;
// `
const HeroBg = styled.div`
  height: 100%;
  filter: brightness(0.6);
  background-size: cover;
  background-image: url('/assets/images/hero.jpg');
`

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: ${COLOR.WHITE};
  letter-spacing: 10px;
`

export default withRouter(Top)
