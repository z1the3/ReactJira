import { useAuth } from '../context/auth_context'
import { FormEvent } from 'react'

export const RegisterScreen = () => {
    const { register, user } = useAuth()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // 这里要断言是inputElement才有value值
        const username = (event.currentTarget.elements[0] as HTMLInputElement)
            .value
        const password = (event.currentTarget.elements[1] as HTMLInputElement)
            .value
        register({ username, password })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id={'username'} />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id={'password'} />
            </div>
            <button type={'submit'}>注册</button>
        </form>
    )
}
