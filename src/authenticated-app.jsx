import { useAuth } from './context/auth_context'
import {ProjectListScreen} from './screens/project-list'
import styled from '@emotion/styled'


export const AuthenticatedApp = ()=>{
    const {logout} = useAuth()
    return <Container>
        <Header>
            <HeaderLeft>
                <h3>logo</h3>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
            </HeaderRight>
        </Header>

        <Main>
            <ProjectListScreen></ProjectListScreen>
        </Main>
    </Container>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    grid-template-areas: 
    "header"
    "main";
`
const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    grid-area: header;
`

const Main = styled.main`
    grid-area: main;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`
const HeaderRight = styled.div`
    
`