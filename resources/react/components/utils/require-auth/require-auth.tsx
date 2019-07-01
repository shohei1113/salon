import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState } from 'redux-react-hook'

const RequireAuth = (props: any) => {
  const { isPrepared, isLoggedin } = useMappedState(
    useCallback(state => state.auth, [])
  )

  useEffect(() => {
    if (isPrepared && !isLoggedin) {
      props.history.push('/')
    }
  }, [isPrepared])

  if (!isPrepared || !isLoggedin) {
    return null
  }

  if (isLoggedin) {
    return props.children
  }
}

export default RequireAuth
