import { Input } from 'antd'
import { useState } from 'react'
import { useAddKanban } from 'utils/kanban'
import { ColumnsContainer } from '.'
import { Container } from './kanban-column'
import { useProjectIdInUrl } from './util'
import styled from '@emotion/styled'

export const CreatKanban = () => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    const { mutateAsync: addKanban } = useAddKanban()

    const submit = async () => {
        await addKanban({ name, projectId })
        setName('')
    }
    return (
        <NewContainer>
            <Input
                size={'large'}
                placeholder={'新建看板名称'}
                onPressEnter={submit}
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            ></Input>
        </NewContainer>
    )
}

const NewContainer = styled(Container)`
    position: fixed;
    right: 0;
    top: 120px;
    background-color: transparent;
`
