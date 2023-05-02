import './wdyr'
import React from 'react'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AppProviders } from './context'
import { DevTools, loadServer } from 'jira-dev-tool'

// 务必在jira-dev-tool后面引入，防止jira-dev-tool中用的antd覆盖
import 'antd'
import ReactDOM from 'react-dom'

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

loadServer(() => {
    ReactDOM.render(
        <React.StrictMode>
            <AppProviders>
                <App />
                <DevTools></DevTools>
            </AppProviders>
        </React.StrictMode>,
        document.getElementById('root')
    )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
