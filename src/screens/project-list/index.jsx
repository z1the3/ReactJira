import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useEffect, useState } from "react"
import { cleanObject } from "../../utils"
import * as qs from 'qs'

export const ProjectListScreen = () => {
    const [param,setParam] = useState({
        name: '',
        personId: ''
    })
    const [list,setList] = useState([])
    // 存储所有user的列表users,
    const [users,setUsers] = useState([])

    const apiUrl = process.env.REACT_APP_API_URL
    // 当param改变时重新获取users,第二个参数监听param
    useEffect(()=>{
        // fetch返回promise
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response =>{
            if(response.ok){
                // response.json会返回promise
                setList(await response.json())
            }
        })
    },[param,apiUrl])

    // 初始化users,由于只触发一次，第二个参数为空数组
    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response =>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}