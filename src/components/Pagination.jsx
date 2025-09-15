import React from 'react'


export default function Pagination({ page, setPage, pages }) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(pages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < pages - 1) {
      rangeWithDots.push('...', pages);
    } else if (pages > 1) {
      rangeWithDots.push(pages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <button 
        disabled={page <= 1} 
        onClick={() => setPage(p => Math.max(1, p - 1))} 
        className="px-2 md:px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {getVisiblePages().map((pageNum, index) => (
        pageNum === '...' ? (
          <span key={index} className="px-2 md:px-3 py-2 text-sm text-gray-500">...</span>
        ) : (
          <button
            key={index}
            onClick={() => setPage(pageNum)}
            className={`px-2 md:px-3 py-2 text-sm font-medium border transition-colors ${
              page === pageNum
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {pageNum}
          </button>
        )
      ))}
      
      <button 
        disabled={page >= pages} 
        onClick={() => setPage(p => Math.min(pages, p + 1))} 
        className="px-2 md:px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}