import { ReactNode } from 'react'
import { AuthProvider } from './auth_context'
import { QueryClient, QueryClientProvider } from 'react-query'
// children为传入的子组件
export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    )
}
