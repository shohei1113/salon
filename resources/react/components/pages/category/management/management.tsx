import React from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import axios from 'axios'
import { DefaultTemplate } from '../../../templates/default-template'
import { Album } from '../../../molecules/album'
import { initCategories } from '../../../../redux/modules/categories'

const Management: React.FC = (props: any) => {
  // async function hoge() {
  //   const response = await axios({
  //     method: 'GET',
  //     url: 'http://zipcloud.ibsnet.co.jp/api/search?zipcode=7830060',
  //     headers: { 'Access-Control-Allow-Origin': '*' },
  //   })
  // }
  // hoge()
  const dispatch = useDispatch()
  dispatch(initCategories())
  return (
    <DefaultTemplate {...props}>
      <Album />
    </DefaultTemplate>
  )
}

export default withRouter(Management as any)
