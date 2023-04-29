/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UserSelect } from 'components/user-select'
import { Project } from 'types'
import { User } from 'types'

interface SearchPanelProps {
    users: User[]
    // 改用工具类型
    param: Partial<Pick<Project, 'name' | 'personId'>>
    // param: {
    //     name: string
    //     personId: string
    // }
    setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
    return (
        <Form style={{ marginBottom: '2rem' }} layout="inline">
            <Form.Item>
                <Input
                    placeholder="项目名"
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
            </Form.Item>
            <Form.Item>
                <UserSelect
                    value={param.personId}
                    onChange={(value) => {
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }}
                    defaultOptionName={'负责人'}
                ></UserSelect>
            </Form.Item>
        </Form>
    )
}
