import { Button, Card, Divider } from 'antd'
import { useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import styled from '@emotion/styled'

export const UnauthenticatedApp = () => {
    // 切换登录注册页
    const [isRegister, setIsRegister] = useState(false)

    return (
        <Container>
            <Header>JIRA</Header>
            <ShadowCard>
                <Title>{isRegister ? '请注册' : '请登录'}</Title>
                {isRegister ? <RegisterScreen /> : <LoginScreen />}
                <Divider></Divider>
                <a onClick={() => setIsRegister(!isRegister)}>
                    {!isRegister ? '注册' : '已经有账号了？登录'}
                </a>
            </ShadowCard>
        </Container>
    )
}

export const LongButton = styled(Button)`
    width: 100%;
`

const Header = styled.header`
    width: 100%;
    height: 10rem;
    line-height: 10rem;
    font-size: 3rem;
    text-align: center;
`
const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132);
`
const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
    text-align: center;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`
