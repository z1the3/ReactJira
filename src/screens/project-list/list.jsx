export const List = ({list,users}) =>{
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map((item,id)=>{return(
                    <tr key={item.id}>
                        <td>{item.name}</td>

                        <td>{users.find(user =>user.id===item.personId)?.name||'未知'}</td>
                    </tr>
                )
                })
            }
        </tbody>
    </table>
}