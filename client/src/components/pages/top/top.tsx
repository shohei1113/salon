import React, { useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { setLoading } from '../../../redux/modules/ui'

const Top: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading())
  }, [dispatch])

  return <div>top</div>
}

export default Top
