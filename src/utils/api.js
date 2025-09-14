// lightweight API helpers that fetch from public/contracts.json
export async function fetchContracts() {
    const res = await fetch('/contracts.json')
    if (!res.ok) throw new Error('Failed to load contracts')
    return res.json()
    }
    
    
    export async function fetchContractById(id) {
    const all = await fetchContracts()
    const found = all.find((c) => c.id === id)
    if (!found) throw new Error('Contract not found')
    
    
    // attach detail fields for demonstration
    return {
    ...found,
    start: '2023-01-01',
    clauses: [
    { title: 'Termination', summary: '90 days notice period.', confidence: 0.82 },
    { title: 'Liability Cap', summary: "12 months’ fees limit.", confidence: 0.87 }
    ],
    insights: [
    { risk: 'High', message: 'Liability cap excludes data breach costs.' },
    { risk: 'Medium', message: 'Renewal auto-renews unless cancelled 60 days before expiry.' }
    ],
    evidence: [
    { source: 'Section 12.2', snippet: "Total liability limited to 12 months’ fees.", relevance: 0.91 }
    ]
    }
    }