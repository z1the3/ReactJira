import { Input } from 'antd'
import { useState } from 'react'
import { useAddKanban } from 'utils/kanban'
import { ColumnsContainer } from '.'
import { Container } from './kanban-column'
import { useProjectIdInUrl } from './util'

export const CreatKanban = () => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    const { mutateAsync: addKanban } = useAddKanban()

    const submit = async () => {
        await addKanban({ name, projectId })
        setName('')
    }
    return (
        <Container>
            <Input
                size={'large'}
                placeholder={'新建看板名称'}
                onPressEnter={submit}
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            ></Input>
        </Container>
    )
}
