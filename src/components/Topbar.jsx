import React from 'react'
import { useAuth } from '../hooks/useAuth'


export default function Topbar({ onOpenUpload }) {
  const { user, logout } = useAuth()
  
  return (
    <div className="glass border-b border-white/20 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 ml-0 md:ml-0">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white/80 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-white">Welcome back, {user?.username}</h2>
            <p className="text-white/70 text-sm">Manage your contracts efficiently</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenUpload} 
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Contracts
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <button 
              onClick={logout} 
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}