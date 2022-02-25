import fetch from "isomorphic-unfetch"
import { useEffect } from "react"
import { useStateIfMounted } from "use-state-if-mounted"

export const useFetchPost = (url) => {
  const [error, setError] = useStateIfMounted(null)
  const [data, setData] = useStateIfMounted([])

  useEffect(() => {
    let abortController = new AbortController()
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        if (response.status !== 200) {
          setError(new Error(`API Error: status code ${response.status}`))
        } else {
          const json = await response.json()
          setData(json)
        }
      } catch (err) {
        setError(err)
      } finally {
      }
    }
    fetchData()
    return () => {
      abortController.abort()
    }
  }, [url])
  return { error, data }
}
