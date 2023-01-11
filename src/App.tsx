import { AuthenticatedApp } from 'authenticated-app'
import { useAuth } from 'context/auth_context'
import React from 'react'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css'
import { ProjectListScreen } from './screens/project-list'

function App() {
    const { user } = useAuth()
    return (
        <div className="APP">
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
    )
}

export default App
