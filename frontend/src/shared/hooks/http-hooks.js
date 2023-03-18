import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    // avoid updating state on a component that is not on screen anymore
    const activeHttpRequests = useRef([]) // store data across rerender cycles

    // this function should never get recreated when the component which uses it rerenders
    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            try {
                setIsLoading(true)
                const httpAbortCtrl = new AbortController() // api available and supported in browser
                activeHttpRequests.current.push(httpAbortCtrl)
                const response = await fetch(url, {
                    method: method,
                    body: body,
                    headers: headers,
                    signal: httpAbortCtrl.signal, // add it to the fetch request
                })
                const responseData = await response.json()
                // remove abort controller from the request
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                )

                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setIsLoading(false)

                return responseData
            } catch (err) {
                setIsLoading(false)
                setError(err.message)
                throw err
            }
        },
        []
    )

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            // about the request to the abort controller
            activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
        }
    }, [])
    return { isLoading: isLoading, error: error, sendRequest, clearError }
}
