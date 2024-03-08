import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState({})

    const [isloading, setLoading] = useState(true)

    useEffect(() => {
        if (!url) return; 
        async function fetchData() {
            const response = await fetch(url)
            const data = await response.json()
            setData(data)
            setLoading(false)
        } 
        setLoading(true)
        fetchData()
    }, [url])

    return { isloading, data }
}