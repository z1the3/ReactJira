import { useAuth } from './context/auth_context'
import { ProjectListScreen } from './screens/project-list'
import styled from '@emotion/styled'
import { Row } from './components/lib'
import { Dropdown, Menu, Button } from 'antd'
import { resetRoute, useDocumentTitle } from 'utils'
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { useState } from 'react'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'
import { useProjectModal } from 'screens/project-list/util'
import { UserPopover } from 'components/user-popover'

export const AuthenticatedApp = () => {
    useDocumentTitle('项目列表', false)
    return (
        <Container>
            <Router>
                <PageHeader />
                <Main>
                    <Routes>
                        <Route
                            path={'projects/'}
                            element={<ProjectListScreen></ProjectListScreen>}
                        ></Route>
                        <Route
                            path={'projects/:projectId/*'}
                            element={<ProjectScreen></ProjectScreen>}
                        ></Route>
                        <Route index element={<ProjectListScreen />}></Route>
                    </Routes>
                </Main>
                <ProjectModal />
            </Router>
        </Container>
    )
}

const PageHeader = () => {
    const { logout, user } = useAuth()
    const items = [
        {
            key: 1,
            label: <a onClick={logout}>登出</a>,
        },
    ]
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <Button
                    style={{ padding: 0 }}
                    type={'link'}
                    onClick={resetRoute}
                >
                    logo
                </Button>
                <ProjectPopover />
                <UserPopover />
            </HeaderLeft>
            <HeaderRight>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>Hi,{user?.name}</a>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    grid-template-areas:
        'header'
        'main';
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`

const Main = styled.main`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
