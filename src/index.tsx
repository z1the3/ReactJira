import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { loadDevTools } from 'jira-dev-tool'
import { AppProviders } from './context'
// 务必在jira-dev-tool后面引入，防止jira-dev-tool中用的antd覆盖
import 'antd'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadDevTools(() => {
    root.render(
        <React.StrictMode>
            <AppProviders>
                <App></App>
            </AppProviders>
        </React.StrictMode>
    )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
