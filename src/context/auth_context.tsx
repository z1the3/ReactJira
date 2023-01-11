import React, { ReactNode, useState } from 'react'
import * as auth from '../auth_provider'
import { User } from '../screens/project-list/search-panel'

interface AuthForm {
    username: string
    password: string
}

const AuthContext = React.createContext<
    | {
          user: User | null
          register: (form: AuthForm) => Promise<void>
          login: (form: AuthForm) => Promise<void>
          logout: () => Promise<void>
      }
    | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    // 等同于.then((data)=>setUser(data))
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    // 为context创造value
    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    // 可以拿到该组件外面的context
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中')
    }
    return context
}
