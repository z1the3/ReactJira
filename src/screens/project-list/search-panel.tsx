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
                <input
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

                <select
                    value={param.personId}
                    onChange={(evt) => {
                        setParam({
                            ...param,
                            personId: evt.target.value,
                        })
                    }}
                >
                    <option value={''}>负责人</option>
                    {users.map((user, id) => {
                        return (
                            <option value={user.id} key={user.id}>
                                {user.name}
                            </option>
                        )
                    })}
                </select>
            </div>
        </form>
    )
}
