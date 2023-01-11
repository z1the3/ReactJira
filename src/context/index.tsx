import { ReactNode } from 'react'
import { AuthProvider } from './auth_context'

// children为传入的子组件
export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>
}
