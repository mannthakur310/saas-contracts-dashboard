import React from 'react'


export default function EvidenceDrawer({ open, onClose, evidence }) {
if (!open) return null
return (
<div className="fixed inset-0 z-40 flex">
<div className="w-full md:w-1/2 lg:w-1/3 bg-white border-l p-4 overflow-auto">
<div className="flex justify-between items-center mb-4">
<h4 className="font-semibold text-lg">Evidence</h4>
<button 
  onClick={onClose}
  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
</div>
{evidence?.map((e, i) => (
<div key={i} className="border rounded-lg p-3 mb-3 hover:shadow-md transition-shadow">
<div className="text-sm text-slate-500 mb-2">{e.source} • relevance {Math.round(e.relevance*100)}%</div>
<div className="text-sm leading-relaxed">{e.snippet}</div>
</div>
))}
</div>
<div className="flex-1" onClick={onClose} />
</div>
)
}