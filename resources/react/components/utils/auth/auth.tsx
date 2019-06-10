import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import PATH from '../../../const/path'
import useFetchApi from '../../../hooks/use-fetch-api'
import { loginAuth } from '../../../redux/modules/auth'
import { setLoader, clearLoader } from '../../../redux/modules/ui'

interface Props {
  history?: any
  children?: React.ReactNode
}

const Auth: React.FC = (props: Props) => {
  const { token } = useMappedState(useCallback(state => state.auth, []))
  const dispatch = useDispatch()
  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/me`,
    headers: { Authorization: `Bearer ${token}` },
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (!token) {
      return
    }

    if (!isLoading) {
      dispatch(setLoader())
    }

    if (error) {
      dispatch(clearLoader())
      return
    }

    if (response) {
      dispatch(
        loginAuth({
          user: response.data.user,
        })
      )
      dispatch(clearLoader())
    }
  }, [response, error])

  return null
}

export default Auth
