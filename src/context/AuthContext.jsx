import React, { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'


export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
const raw = localStorage.getItem('saas_auth')
return raw ? JSON.parse(raw) : null
})


useEffect(() => {
if (user) localStorage.setItem('saas_auth', JSON.stringify(user))
else localStorage.removeItem('saas_auth')
}, [user])


function login(username, password) {
return new Promise((resolve, reject) => {
setTimeout(() => {
if (password === 'test123') {
const token = 'mock-jwt-' + Math.random().toString(36).slice(2)
const payload = { username, token }
setUser(payload)
resolve(payload)
} else reject(new Error('Invalid credentials'))
}, 600)
})
}


function logout() {
setUser(null)
}


return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
)
}

