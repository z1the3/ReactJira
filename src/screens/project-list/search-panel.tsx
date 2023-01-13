import { Input } from 'antd'
import Select from 'antd/es/select'
import { useEffect, useState } from 'react'
export interface User {
    id: string
    name: string
    email: string
    title: string
    organization: string
    token: string
}
interface SearchPanelProps {
    users: User[]
    param: {
        name: string
        personId: string
    }
    setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
    return (
        <form>
            <div>
                <Input
                    type="text"
                    value={param.name}
                    onChange={(evt) => {
                        setParam({
                            // 展开原来的param,替换成新的name
                            ...param,
                            name: evt.target.value,
                        })
                    }}
                />

                <Select
                    value={param.personId}
                    onChange={(value) => {
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }}
                >
                    <Select.Option value={''}>负责人</Select.Option>
                    {users.map((user, id) => {
                        return (
                            <Select.Option value={user.id} key={user.id}>
                                {user.name}
                            </Select.Option>
                        )
                    })}
                </Select>
            </div>
        </form>
    )
}
