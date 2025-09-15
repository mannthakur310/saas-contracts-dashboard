import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ContractsTable from '../components/ContractsTable'
import UploadModal from '../components/UploadModal'
import { useContracts } from '../hooks/useContracts'


export default function Dashboard() {
const { contracts, loading, error } = useContracts()
const [showUpload, setShowUpload] = useState(false)
const [sidebarOpen, setSidebarOpen] = useState(false)

return (
<div className="min-h-screen flex">
  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  <div className="flex-1 flex flex-col">
    <Topbar 
      onOpenUpload={()=>setShowUpload(true)} 
      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
    />
    <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Contract Dashboard</h1>
            <p className="text-gray-600 text-sm md:text-base">Manage and monitor your contract portfolio</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:flex lg:items-center">
            <div className="card px-3 md:px-6 py-3 md:py-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-blue-600">{contracts?.length ?? '—'}</div>
                <div className="text-xs md:text-sm text-gray-600">Total</div>
              </div>
            </div>
            <div className="card px-3 md:px-6 py-3 md:py-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-emerald-600">
                  {contracts?.filter(c => c.status === 'Active').length ?? '—'}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Active</div>
              </div>
            </div>
            <div className="card px-3 md:px-6 py-3 md:py-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-amber-600">
                  {contracts?.filter(c => c.status === 'Renewal Due').length ?? '—'}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Renewal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      <ContractsTable data={contracts} loading={loading} error={error} />
    </main>
  </div>
  <UploadModal open={showUpload} onClose={()=>setShowUpload(false)} />
</div>
)
}