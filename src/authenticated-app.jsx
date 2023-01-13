import { useAuth } from './context/auth_context'
import {ProjectListScreen} from './screens/project-list'
import styled from '@emotion/styled'


export const AuthenticatedApp = ()=>{
    const {logout} = useAuth()
    return <div>
        <PageHeader>
            <HeaderLeft>
                <h3>logo</h3>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
            </HeaderRight>
        </PageHeader>
        <Main>
            <ProjectListScreen></ProjectListScreen>
        </Main>
    </div>
}

const PageHeader = styled.header`
    height: 6rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Main = styled.main`
    height:calc(100vh - 6rem);
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`
const HeaderRight = styled.div`
    
`