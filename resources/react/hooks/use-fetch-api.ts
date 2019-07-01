import { useState, useEffect } from 'react'
import axios from 'axios'

export default (axiosConfig: any, isStartFetch: any) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [response, setResponse] = useState<any>(undefined)

  const request = async () => {
    setLoading(true)
    try {
      const { data } = await axios(axiosConfig)
      setResponse(data)
    } catch (e) {
      console.log('Error getting document', e)
      setError(e)
    } finally {
      setLoading(false)
    }

    return () => {}
  }

  useEffect(() => {
    if (isStartFetch) {
      request()
    }
  }, [isStartFetch])

  return { isLoading, response, error }
}
