import React, { useEffect } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import axios from 'axios'
import { initAuth } from '../../../redux/modules/auth'

interface Props {
  history?: any
  children?: React.ReactNode
}

const Auth: React.FC = (props: Props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAuth = async () => {
      const {
        data: { redirect_url },
      } = await axios({
        method: 'GET',
        url: 'https://76980c7d.ngrok.io/api/auth/login/facebook',
        headers: {},
      })
      console.log(redirect_url)

      const a = await axios({
        method: 'GET',
        url: redirect_url,
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      console.log(a)
    }

    // fetchAuth()

    dispatch(initAuth())
  }, [])

  return null
}

export default Auth
