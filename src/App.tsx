import { AuthenticatedApp } from 'authenticated-app'
import { useAuth } from 'context/auth_context'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css'

function App() {
    const { user } = useAuth()
    return (
        <div className="APP">
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
    )
}

export default App
