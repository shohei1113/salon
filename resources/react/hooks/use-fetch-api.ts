import { useState, useEffect } from 'react'
import axios from 'axios'

export default (axiosConfig: any, isStartFetch: any) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setdData] = useState<any>(undefined)

  const request = async () => {
    setLoading(true)
    try {
      const { data } = await axios(axiosConfig)
      setdData(data)
    } catch (e) {
      console.log('Error getting document', e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isStartFetch) {
      request()
    }
  }, [isStartFetch])

  return { isLoading, data, error }
}
