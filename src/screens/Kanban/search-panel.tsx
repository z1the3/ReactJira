import { Button, Input } from 'antd'
import { Row } from 'components/lib'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import { useSetUrlSearchParam } from 'utils/url'
import { useTasksSearchParamsPanels } from './util'

export const SearchPanel = () => {
    const searchParams = useTasksSearchParamsPanels()
    // todo,找到url.ts中的这个
    const setSearchParams = useSetUrlSearchParam()
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processId: undefined,
            tagId: undefined,
            name: undefined,
        })
    }
    return (
        <Row gap={true}>
            <Input
                style={{ width: '20rem' }}
                placeholder={'任务名'}
                value={searchParams.name}
                onChange={(evt) => setSearchParams({ name: evt.target.value })}
            ></Input>
            <UserSelect
                defaultOptionName={'经办人'}
                value={searchParams.processorId}
                onChange={(value) => setSearchParams({ processorId: value })}
            ></UserSelect>
            <TaskTypeSelect
                defaultOptionName={'类型'}
                value={searchParams.typeId}
                onChange={(value) => setSearchParams({ typeId: value })}
            ></TaskTypeSelect>
            <Button onClick={reset}>清除筛选器</Button>
        </Row>
    )
}
