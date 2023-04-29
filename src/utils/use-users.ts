import { useEffect, useState } from 'react'
import { cleanObject, useMount, useDebounce, useDocumentTitle } from '.'
import { useHttp } from 'utils/http'
import { User } from 'types'
import { useQuery } from 'react-query'

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()

    // useQuery第一个参数可以类似useEffect监听
    return useQuery<User[]>(['users', param], () =>
        client('users', { data: param })
    )
}

// export const useUsers = () => {
//     const client = useHttp()
//     const [users, setUsers] = useState<User[]>([])
//     const apiUrl = process.env.REACT_APP_API_URL
//     // 当param改变时重新获取users,第二个参数监听param

//     // 初始化users,由于只触发一次,得出现空数组，所以封装个custom hook
//     useMount(() => {
//         // 封装前
//         // fetch(`${apiUrl}/users`).then(async (response) => {
//         //     if (response.ok) {
//         //         setUsers(await response.json())
//         //     }
//         // })
//         client('users').then(setUsers)
//     })
//     return users
// }
