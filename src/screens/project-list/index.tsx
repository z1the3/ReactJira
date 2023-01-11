import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useMount, useDebounce } from '../../utils'
import * as qs from 'qs'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const [list, setList] = useState([])
    const client = useHttp()
    const debouncedParam = useDebounce(param, 500)
    // 存储所有user的列表users,
    const [users, setUsers] = useState([])

    const apiUrl = process.env.REACT_APP_API_URL
    // 当param改变时重新获取users,第二个参数监听param
    useEffect(() => {
        // fetch返回promise
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    }, [debouncedParam, apiUrl])

    // 初始化users,由于只触发一次,得出现空数组，所以封装个custom hook
    useMount(() => {
        // 封装前
        // fetch(`${apiUrl}/users`).then(async (response) => {
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
        client('users').then(setUsers)
    })

    return (
        <div>
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users}
            ></SearchPanel>
            <List list={list} users={users}></List>
        </div>
    )
}
