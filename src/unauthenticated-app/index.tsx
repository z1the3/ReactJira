import { Button, Card, Divider, Typography } from 'antd'
import { useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import styled from '@emotion/styled'
import { useDocumentTitle } from 'utils'
import { ErrorBox } from 'components/lib'

export const UnauthenticatedApp = () => {
    // 切换登录注册页
    const [isRegister, setIsRegister] = useState(false)
    // 错误处理的状态
    // 由登录和注册组件抛出错误状态
    const [error, setError] = useState<Error | null>(null)

    useDocumentTitle('请登录或注册以继续')

    return (
        <Container>
            <Header>JIRA</Header>
            <ShadowCard>
                <Title>{isRegister ? '请注册' : '请登录'}</Title>
                {/* {error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null} */}
                <ErrorBox error={error}></ErrorBox>
                {isRegister ? (
                    <RegisterScreen setError={setError} />
                ) : (
                    <LoginScreen setError={setError} />
                )}
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
