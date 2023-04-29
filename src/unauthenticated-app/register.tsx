import { useAuth } from '../context/auth_context'
import { FormEvent } from 'react'
import { Form, Input, Button } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export const RegisterScreen = ({
    setError,
}: {
    setError: (error: Error | null) => void
}) => {
    const { register, user } = useAuth()
    const { run, isLoading, error } = useAsync<void>(undefined, {
        throwOnError: false,
    })
    const handleSubmit = ({
        cpassword,
        ...values
    }: {
        username: string
        password: string
        cpassword: string
    }) => {
        if (cpassword !== values.password) {
            setError(new Error('请确认两次输入的密码相同'))
            return
        }
        run(register(values)).catch(setError)
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
            <Form.Item
                name={'cpassword'}
                rules={[{ required: true, message: '请确认密码' }]}
            >
                <Input placeholder={'密码'} type="password" id={'cpassword'} />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type={'primary'}>
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    )
}
