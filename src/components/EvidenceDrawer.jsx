import React from 'react'


export default function EvidenceDrawer({ open, onClose, evidence }) {
if (!open) return null
return (
<div className="fixed inset-0 z-40 flex">
<div className="w-1/3 bg-white border-l p-4 overflow-auto">
<div className="flex justify-between items-center mb-4">
<h4 className="font-semibold">Evidence</h4>
<button onClick={onClose}>Close</button>
</div>
{evidence?.map((e, i) => (
<div key={i} className="border rounded p-3 mb-3">
<div className="text-sm text-slate-500">{e.source} • relevance {Math.round(e.relevance*100)}%</div>
<div className="mt-2">{e.snippet}</div>
</div>
))}
</div>
<div className="flex-1" onClick={onClose} />
</div>
)
}