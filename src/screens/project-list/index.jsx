import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useEffect, useState } from "react"
import { cleanObject, useMount,useDebounce } from "../../utils"
import * as qs from 'qs'

export const ProjectListScreen = () => {
    const [param,setParam] = useState({
        name: '',
        personId: ''
    })
    const [list,setList] = useState([])
    const debouncedParam = useDebounce(param,2000)
    // 存储所有user的列表users,
    const [users,setUsers] = useState([])

    const apiUrl = process.env.REACT_APP_API_URL
    // 当param改变时重新获取users,第二个参数监听param
    useEffect(()=>{
        // fetch返回promise
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response =>{
            if(response.ok){
                // response.json会返回promise
                setList(await response.json())
            }
        })
    },[debouncedParam,apiUrl])
 
    // 初始化users,由于只触发一次,得出现空数组，所以封装个custom hook
    useMount(()=>{
        fetch(`${apiUrl}/users`).then(async response =>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })


    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}