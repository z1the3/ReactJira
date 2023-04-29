import { useAuth } from '../context/auth_context'
import { FormEvent } from 'react'
import { Form, Input, Button } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export const LoginScreen = ({
    setError,
}: {
    setError: (error: Error | null) => void
}) => {
    const { login, user } = useAuth()
    // 不能用error，因为run是异步的，setError是同步的
    const { run, isLoading, error } = useAsync<void>(undefined, {
        throwOnError: false,
    })
    const handleSubmit = (values: { username: string; password: string }) => {
        // run(login(values)).catch(setError)
        run(login(values)).catch(setError)
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name={'username'}
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Form.Item>
                <LongButton
                    loading={isLoading}
                    htmlType={'submit'}
                    type={'primary'}
                >
                    登录
                </LongButton>
            </Form.Item>
        </Form>
    )
}
