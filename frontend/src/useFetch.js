import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            setIsPending(false);
            setError("Please log in to perform this operation");
            return;
        }

        const abortCont = new AbortController();

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

    }, [url, token])

    return { data, isPending, error }
}

export default useFetch