import React, { useState, useEffect } from 'react'
import { fetchContracts } from '../utils/api'
import { ContractsContext } from './ContractsContext'


export function ContractsProvider({ children }) {
const [contracts, setContracts] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


async function load() {
setLoading(true)
setError(null)
try {
const data = await fetchContracts()
setContracts(data)
} catch (err) {
setError(err.message || 'Unknown error')
}
setLoading(false)
}


useEffect(() => {
load()
}, [])


return (
<ContractsContext.Provider value={{ contracts, loading, error, reload: load }}>
{children}
</ContractsContext.Provider>
)
}

