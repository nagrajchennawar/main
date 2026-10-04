import { useEffect, useState } from 'react'

/* eslint-disable react-hooks/set-state-in-effect */
export function useAsyncResource(fetcher) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    setLoading(true)
    setError(null)

    fetcher()
      .then((response) => {
        if (active) {
          setData(response)
        }
      })
      .catch((err) => {
        if (active) {
          setError(err?.message || 'Something went wrong while loading the data.')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [fetcher])

  return { data, loading, error }
}
