import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();
        const token = localStorage.getItem("token")

        fetch(url, {
            signal: abortCont.signal,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data, please try again later')
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(true)
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log("fetch aborted")
                } else {
                    setIsPending(false);
                    setError(err.message);
                }

            })
        return () => abortCont.abort()

    }, [url])

    return { data, isPending, error }
}



export default useFetch