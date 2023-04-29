import styled from '@emotion/styled'
import { Button, List, Modal } from 'antd'
import { Row, ScreenContainer } from 'components/lib'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjectInUrl } from 'screens/Kanban/util'
import { Epic } from 'types'
import { useDeleteEpic, useEpics } from 'utils/epic'
import { useTasks } from 'utils/task'
import { CreateEpic } from './create-epic'
import { useEpicSearchParams } from './util'

export const EpicScreen = () => {
    const { data: currentProject } = useProjectInUrl()
    const { data: epics } = useEpics(useEpicSearchParams())
    const { data: tasks } = useTasks({ projectId: currentProject?.id })
    const { mutate: deleteEpic } = useDeleteEpic()
    const [createEpic, setCreateEpic] = useState(false)

    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
            title: `确定删除项目组：${epic.name}`,
            content: '点击确认删除',
            okText: '确定',
            onOk() {
                deleteEpic({ id: epic.id })
            },
        })
    }
    return (
        <ScreenContainer>
            <Row between={true}>
                <h1>{currentProject?.name}任务组</h1>
                <Button onClick={() => setCreateEpic(true)} type={'link'}>
                    创建任务组
                </Button>
            </Row>

            <List
                style={{ overflow: 'scroll' }}
                dataSource={epics}
                itemLayout={'vertical'}
                renderItem={(epic) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <Row between={true}>
                                    <span>{epic.name}</span>
                                    <Button
                                        onClick={() => confirmDeleteEpic(epic)}
                                        type={'link'}
                                    >
                                        删除
                                    </Button>
                                </Row>
                            }
                            description={
                                <div>
                                    <div>
                                        {tasks
                                            ?.filter(
                                                (task) =>
                                                    task.epicId === epic.id
                                            )
                                            .map((task) => (
                                                <div key={task.id}>
                                                    <Link
                                                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                                                        key={task.id}
                                                    >
                                                        {task.name}
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>
                                    <div>
                                        开始时间：
                                        {dayjs(epic.start).format('YYYY-MM-DD')}
                                    </div>
                                    <div>
                                        结束时间：
                                        {dayjs(epic.end).format('YYYY-MM-DD')}
                                    </div>
                                </div>
                            }
                        ></List.Item.Meta>
                    </List.Item>
                )}
            >
                <CreateEpic
                    open={createEpic}
                    onClose={() => setCreateEpic(false)}
                ></CreateEpic>
            </List>
        </ScreenContainer>
    )
}

export const ColumnsContainer = styled('div')`
    display: flex;
    overflow-x: scroll;
    /* ::-webkit-scrollbar {
        display: none;
    } */
    justify-content: flex-start;
    flex: 1;
    padding: 2rem;
`
