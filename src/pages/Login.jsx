import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


export default function Login() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const { login } = useAuth()
const navigate = useNavigate()


async function handleSubmit(e) {
e.preventDefault()
setLoading(true)
setError(null)
try {
await login(username, password)
navigate('/')
} catch (err) {
setError(err.message)
}
setLoading(false)
}


return (
<div className="min-h-screen flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <div className="card p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">C</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your Contracts Dashboard</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Username</label>
          <input 
            value={username} 
            onChange={e=>setUsername(e.target.value)} 
            className="form-input"
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div>
          <label className="form-label">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            className="form-input"
            placeholder="Enter your password"
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            Demo credentials: Use password <span className="font-medium text-blue-600">test123</span>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}
        
        <button 
          disabled={loading} 
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Contact support
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
)
}