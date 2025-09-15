import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isOpen, onClose }) {
  const nav = [
    { to: '/', label: 'Contracts', icon: '📄' },
    { to: '/insights', label: 'Insights', icon: '📊' },
    { to: '/reports', label: 'Reports', icon: '📈' },
    { to: '/settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50 md:z-auto
        w-72 glass h-full border-r border-white/20 backdrop-blur-xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Contracts</h1>
              <p className="text-white/70 text-sm">Dashboard</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button 
            onClick={onClose}
            className="md:hidden text-white/80 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="space-y-2">
          {nav.map((n) => (
            <NavLink 
              key={n.to} 
              to={n.to} 
              onClick={onClose}
              className={({isActive}) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                {n.icon}
              </span>
              <span className="font-medium">{n.label}</span>
              {n.to === '/' && (
                <span className="ml-auto bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                  12
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        <div className="glass rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Premium Plan</p>
              <p className="text-white/60 text-xs">Upgrade for more features</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}