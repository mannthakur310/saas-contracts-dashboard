import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import EvidenceDrawer from '../components/EvidenceDrawer'
import { fetchContractById } from '../utils/api'

export default function ContractDetail() {
  const { id } = useParams()
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openEvidence, setOpenEvidence] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchContractById(id).then(data => {
      setContract(data)
      setLoading(false)
    }).catch(e => { 
      setError(e.message)
      setLoading(false) 
    })
  }, [id])

  if (loading) return (<div className="min-h-screen flex items-center justify-center">Loading…</div>)
  if (error) return (<div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>)


return (
<div className="min-h-screen flex">
  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  <div className="flex-1 flex flex-col">
    <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
    <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2 text-sm md:text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Contracts
          </Link>
        </div>
        
        <div className="card">
          <div className="card-header">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{contract.name}</h1>
                <p className="text-gray-600 text-sm md:text-base">{contract.parties}</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={()=>setOpenEvidence(true)} 
                  className="btn-primary flex items-center gap-2 text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden sm:inline">View Evidence</span>
                  <span className="sm:hidden">Evidence</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="card-body">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-500 mb-1">Start Date</div>
                <div className="font-semibold text-gray-900 text-sm md:text-base">{contract.start}</div>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-500 mb-1">Expiry Date</div>
                <div className="font-semibold text-gray-900 text-sm md:text-base">{contract.expiry}</div>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-500 mb-1">Status</div>
                <span className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                  contract.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                  contract.status === 'Expired' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {contract.status}
                </span>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-500 mb-1">Risk Level</div>
                <span className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                  contract.risk === 'Low' ? 'bg-green-100 text-green-800' :
                  contract.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {contract.risk}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Contract Clauses</h3>
            <p className="text-gray-600 text-sm">AI-extracted clauses with confidence scores</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {contract.clauses.map((c, i)=> (
                <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-gray-900">{c.title}</div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{width: `${c.confidence*100}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {Math.round(c.confidence*100)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">{c.summary}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">AI Insights</h3>
            <p className="text-gray-600 text-sm">Risk analysis and recommendations</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {contract.insights.map((i, idx)=> (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">{i.message}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      i.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      i.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {i.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <EvidenceDrawer open={openEvidence} onClose={()=>setOpenEvidence(false)} evidence={contract.evidence} />
</div>
)
}