import { Table } from 'antd'
import { User } from './search-panel'

interface Project {
    id: string
    name: string
    personId: string
    pin: boolean
}

interface ListProps {
    list: Project[]
    users: User[]
}

export const List = ({ list, users }: ListProps) => {
    // localeCompare可以比较中文字符
    // 负责人对于的每一列id不能通过dataIndex简单找到，需要使用render
    return (
        <Table
            pagination={false}
            dataSource={list}
            columns={[
                {
                    title: '名称',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                },
                {
                    title: '负责人',
                    render(value, item) {
                        return (
                            <span>
                                {users.find((user) => user.id === item.personId)
                                    ?.name || '未知'}
                            </span>
                        )
                    },
                },
            ]}
        ></Table>
    )
}
