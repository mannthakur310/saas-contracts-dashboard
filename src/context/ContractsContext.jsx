import React, { useState, useEffect } from 'react'
import { fetchContracts } from '../utils/api'
import { ContractsContext } from './ContractsContext'


export function ContractsProvider({ children }) {
const [contracts, setContracts] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

// Fallback mock data
const mockContracts = [
    {
        "id": "c1",
        "name": "MSA 2025",
        "parties": "Microsoft & ABC Corp",
        "expiry": "2025-12-31",
        "status": "Active",
        "risk": "Medium"
    },
    {
        "id": "c2",
        "name": "Network Services Agreement",
        "parties": "TelNet & ABC Corp",
        "expiry": "2025-10-10",
        "status": "Renewal Due",
        "risk": "High"
    },
    {
        "id": "c3",
        "name": "SaaS Subscription",
        "parties": "CloudCo & ABC Corp",
        "expiry": "2024-11-30",
        "status": "Expired",
        "risk": "Low"
    }
]

async function load() {
setLoading(true)
setError(null)
try {
const data = await fetchContracts()
setContracts(data)
} catch (err) {
console.warn('Failed to load contracts from API, using mock data:', err.message)
setContracts(mockContracts)
setError(null) // Don't show error if we have fallback data
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

