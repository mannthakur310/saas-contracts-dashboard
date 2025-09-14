import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ContractsTable from '../components/ContractsTable'
import UploadModal from '../components/UploadModal'
import { useContracts } from '../hooks/useContracts'


export default function Dashboard() {
const { contracts, loading, error } = useContracts()
const [showUpload, setShowUpload] = useState(false)


return (
<div className="min-h-screen flex">
  <Sidebar />
  <div className="flex-1 flex flex-col ml-0 md:ml-0">
    <Topbar onOpenUpload={()=>setShowUpload(true)} />
    <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contract Dashboard</h1>
            <p className="text-gray-600">Manage and monitor your contract portfolio</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="card px-6 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{contracts?.length ?? '—'}</div>
                <div className="text-sm text-gray-600">Total Contracts</div>
              </div>
            </div>
            <div className="card px-6 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {contracts?.filter(c => c.status === 'Active').length ?? '—'}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
            </div>
            <div className="card px-6 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {contracts?.filter(c => c.status === 'Renewal Due').length ?? '—'}
                </div>
                <div className="text-sm text-gray-600">Renewal Due</div>
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