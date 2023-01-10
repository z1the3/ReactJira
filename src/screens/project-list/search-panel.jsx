import { useEffect, useState } from "react"


export const SearchPanel = ({param,setParam,users})=>{


 

    return <form>
        <div>
            <input type="text" value={param.name} 
            onChange={(evt)=>{
                setParam({
                    // 展开原来的param,替换成新的name
                    ...param,
                    name:evt.target.value
                })
            }} />

            <select value={param.personId}
            onChange={(evt)=>{
                setParam({
                    ...param,
                    personId:evt.target.value
                })
            }}>
                <option value={''}>负责人</option>
                {
                    users.map((user,id)=>{return(
                        <option value={user.id} key={user.id}>{user.name}</option>
                    )})
                }
            </select>

        </div>
    </form>
}