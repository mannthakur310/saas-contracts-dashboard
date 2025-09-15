import React, { useState } from 'react'


export default function UploadModal({ open, onClose }) {
const [files, setFiles] = useState([])


function onSelect(e) {
const list = Array.from(e.target.files || e.dataTransfer.files)
const items = list.map(f=> ({ id: Math.random().toString(36).slice(2), name: f.name, status: 'Uploading' }))
setFiles(prev => [...items, ...prev])
items.forEach((it)=>{
setTimeout(()=>{
setFiles(prev => prev.map(p=> p.id === it.id ? {...p, status: Math.random() > 0.1 ? 'Success' : 'Error'} : p))
}, 800 + Math.random()*1200)
})
}


if (!open) return null
return (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="card w-full max-w-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
    <div className="card-header">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Upload Contracts</h3>
          <p className="text-gray-600 text-sm mt-1">Upload your contract documents for analysis</p>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <div className="card-body">
      <label className="block border-2 border-dashed border-gray-300 hover:border-blue-400 p-6 md:p-8 text-center rounded-xl cursor-pointer transition-colors duration-300 bg-gray-50 hover:bg-blue-50/30">
        <input type="file" multiple className="hidden" onChange={onSelect} />
        <div className="space-y-3">
          <div className="mx-auto w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-base md:text-lg font-medium text-gray-900">Drop files here or click to browse</p>
            <p className="text-gray-600 text-sm">Support for PDF, DOC, DOCX files</p>
          </div>
        </div>
      </label>
      
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Upload Progress</h4>
          <div className="space-y-2">
            {files.map(f => (
              <div key={f.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    📄
                  </div>
                  <span className="text-sm font-medium text-gray-900">{f.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {f.status === 'Uploading' && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span className={`text-sm font-medium ${
                    f.status === 'Success' ? 'text-emerald-600' : 
                    f.status === 'Error' ? 'text-red-600' : 
                    'text-blue-600'
                  }`}>
                    {f.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>
)
}