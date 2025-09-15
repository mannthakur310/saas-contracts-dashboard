import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'

export default function ContractsTable({ data, loading, error }) {
const [query, setQuery] = useState('')
const [statusFilter, setStatusFilter] = useState('')
const [riskFilter, setRiskFilter] = useState('')
const [page, setPage] = useState(1)
const pageSize = 10

function statusBadge(status) {
  switch (status) {
    case 'Active':
      return 'status-active'
    case 'Expired':
      return 'status-expired'
    case 'Renewal Due':
      return 'status-renewal'
    default:
      return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium'
  }
}

function riskBadge(risk) {
  switch (risk) {
    case 'Low':
      return 'risk-low'
    case 'Medium':
      return 'risk-medium'
    case 'High':
      return 'risk-high'
    default:
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium'
  }
}


const filtered = useMemo(() => {
if (!data) return []
let out = data.filter((c) => {
if (statusFilter && c.status !== statusFilter) return false
if (riskFilter && c.risk !== riskFilter) return false
if (query) {
const q = query.toLowerCase()
return c.name.toLowerCase().includes(q) || c.parties.toLowerCase().includes(q)
}
return true
})
return out
}, [data, query, statusFilter, riskFilter])


const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
const pageData = filtered.slice((page-1)*pageSize, page*pageSize)


if (loading) return <div className="p-6">Loading contracts...</div>
if (error) return <div className="p-6 text-red-500">{error}</div>
if (!data || data.length === 0) return <div className="p-6">No contracts yet.</div>


return (
<div className="space-y-6">
  {/* Search and Filters */}
  <div className="card">
    <div className="card-body">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input 
              value={query} 
              onChange={e=>{setQuery(e.target.value); setPage(1)}} 
              placeholder="Search contracts by name or parties..." 
              className="form-input pl-10"
            />
            {/* <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div> */}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select 
            value={statusFilter} 
            onChange={e=>{setStatusFilter(e.target.value); setPage(1)}} 
            className="form-input w-full sm:w-40"
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Renewal Due</option>
          </select>
          <select 
            value={riskFilter} 
            onChange={e=>{setRiskFilter(e.target.value); setPage(1)}} 
            className="form-input w-full sm:w-32"
          >
            <option value="">All Risk</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  {/* Results Summary */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <div className="text-sm text-gray-600">
      Showing {pageData.length} of {filtered.length} contracts
    </div>
    <div className="text-sm text-gray-600">
      Page {page} of {pages}
    </div>
  </div>

  {/* Table */}
  <div className="table-container overflow-x-auto">
    <table className="min-w-full">
      <thead className="table-header">
        <tr>
          <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contract</th>
          <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Parties</th>
          <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Expiry</th>
          <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
          <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Risk</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {pageData.map(c=> (
          <tr key={c.id} className="table-row">
            <td className="px-3 md:px-6 py-4">
              <Link 
                to={`/contracts/${c.id}`} 
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200 text-sm md:text-base"
              >
                {c.name}
              </Link>
              <div className="text-xs text-gray-500 sm:hidden mt-1">{c.parties}</div>
            </td>
            <td className="px-3 md:px-6 py-4 text-gray-700 hidden sm:table-cell text-sm md:text-base">{c.parties}</td>
            <td className="px-3 md:px-6 py-4 text-gray-600 text-sm md:text-base">{c.expiry}</td>
            <td className="px-3 md:px-6 py-4">
              <span className={statusBadge(c.status)}>
                {c.status}
              </span>
            </td>
            <td className="px-3 md:px-6 py-4 hidden md:table-cell">
              <span className={riskBadge(c.risk)}>
                {c.risk}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-center">
    <Pagination page={page} setPage={setPage} pages={pages} />
  </div>
</div>
)
}