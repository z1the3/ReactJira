import styled from '@emotion/styled'
import { Button, Card, Dropdown, Menu, MenuProps, Modal } from 'antd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import { Row } from 'components/lib'
import { Mark } from 'components/mark'
import React from 'react'
import { Kanban, Task } from 'types'
import { useDeleteKanban } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { useTaskTypes } from 'utils/task-type'
import { CreateTask } from './create-task'
import {
    useTasksModal,
    useTasksSearchParams,
    useTasksSearchParamsPanels,
} from './util'

const TaskTypeIcon = ({ id }: { id: number }) => {
    // 获取所有的task列表的接口，只含 type信息
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name
    if (!name) {
        return null
    }
    return (
        <div style={{ margin: '2rem', display: 'inline' }}>
            {name === 'task' ? (
                <div style={{ color: 'blue', display: 'inline' }}>T</div>
            ) : (
                <div style={{ color: 'red', display: 'inline' }}>B</div>
            )}
        </div>
    )
}

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal()
    const { name: keyword } = useTasksSearchParamsPanels()
    return (
        <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
            key={task.id}
        >
            <Mark name={task.name} keyword={keyword}></Mark>

            <TaskTypeIcon id={task.typeId}></TaskTypeIcon>
        </Card>
    )
}

const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban()
    const startDelete = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗',
            onOk() {
                return mutateAsync({ id: kanban.id })
            },
        })
    }
    const overlay = (
        <Menu>
            <Menu.Item>
                <Button type={'link'} onClick={startDelete}>
                    删除
                </Button>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={overlay}>
            <Button type={'link'}>...</Button>
        </Dropdown>
    )
}

export const KanbanColumn = React.forwardRef<
    HTMLDivElement,
    { kanban: Kanban }
>(({ kanban, ...props }: { kanban: Kanban }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParamsPanels(kanban.id))

    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
    return (
        <Container ref={ref} {...props}>
            <Row between={true}>
                <h3 style={{ fontWeight: 600 }}>{kanban.name}</h3>
                <More kanban={kanban} key={kanban.id}></More>
            </Row>
            <TasksContainer>
                <Drop
                    type={'ROW'}
                    direction={'vertical'}
                    droppableId={'' + kanban.id}
                >
                    <DropChild
                        flexD={'vertical'}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        {tasks?.map((task, index) => (
                            <Drag
                                key={task.id}
                                index={index}
                                draggableId={'task' + task.id}
                            >
                                <TaskCard key={task.id} task={task}></TaskCard>
                            </Drag>
                        ))}
                    </DropChild>
                </Drop>

                <CreateTask kanbanId={kanban.id}></CreateTask>
            </TasksContainer>
        </Container>
    )
})

export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(223, 224, 225);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 2rem;
`

const TasksContainer = styled.div`
    /* overflow: scroll; */
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`
