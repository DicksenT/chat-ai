export const apiFetch = async<T>(
    url: string,
    method: "GET" | "POST" | 'DELETE' | 'PATCH',
    body?: any,
    transformFn?: Function
): Promise<T | null>=>{
    try{
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: body ? JSON.stringify(body) : undefined 
        })
        if(!response.ok) {
            const err = await response.text()
            throw new Error(err || 'failed to fetch')
        }
        const {data} = await response.json()
        return transformFn ? transformFn(data) : data
    }catch(error){
        console.error('Fetch error: ', error)
        return null
    }
}

export const getFetch = async<T>(
    url:string,
    transformFn?: Function,
): Promise<Record<string, T> | null>=>{
    try{
        console.log('entered')
        const res = await fetch(url)
        if(!res.ok){
            const err = await res.text()
            throw new Error(err || 'failed to fetch')
        }
        
        const {data} = await res.json()
        console.log(data)
        const changedData = data.reduce((acc, val) =>{
            const data = transformFn ? transformFn(val) : val
            acc[data._id] = data
            return acc
        },{} as Record<string, T>)
        console.log(changedData)
        return changedData
    }catch(error){
        console.error(error)
        return null
    }
}