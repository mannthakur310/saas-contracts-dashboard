import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ContractDetail from './pages/ContractDetail'
import { useAuth } from './hooks/useAuth'


function PrivateRoute({ children }) {
const { user } = useAuth()
if (!user) return <Navigate to="/login" replace />
return children
}


export default function App() {
return (
<Routes>
<Route path="/login" element={<Login />} />
<Route
path="/"
element={<PrivateRoute><Dashboard /></PrivateRoute>}
/>
<Route
path="/contracts/:id"
element={<PrivateRoute><ContractDetail /></PrivateRoute>}
/>
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
)
}