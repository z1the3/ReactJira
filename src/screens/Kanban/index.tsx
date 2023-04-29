import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { useCallback, useState } from 'react'
import { SearchPanel } from 'screens/Kanban/search-panel'
import { useDocumentTitle } from 'utils'
import { useKanbans, useReorderKanban } from 'utils/kanban'
import { useReorderTask, useTasks } from 'utils/task'
import { KanbanColumn } from './kanban-column'
import {
    useKanbanSearchParams,
    useKanbansQueryKey,
    useProjectIdInUrl,
    useProjectInUrl,
    useTasksModal,
    useTasksSearchParams,
    useTasksSearchParamsPanels,
} from './util'
import { CreatKanban } from './create-kanban'
import { TaskModal } from './task-modal'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: kanbans, isLoading: KanbanIsLoading } = useKanbans(
        useKanbanSearchParams()
    )
    const { data: currentProject } = useProjectInUrl()
    // task结果加载

    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParamsPanels())
    const isLoading = taskIsLoading || KanbanIsLoading

    const onDragEnd = useDragEnd()
    // console.log(useKanbans())
    return (
        // onDragEnd常常用于数据持久化
        <DragDropContext onDragEnd={onDragEnd}>
            <ScreenContainer>
                <h1>{currentProject?.name} 看板</h1>
                <SearchPanel></SearchPanel>
                {isLoading ? (
                    <Spin size={'large'}></Spin>
                ) : (
                    <ColumnsContainer>
                        <Drop
                            type={'COLUMN'}
                            direction={'horizontal'}
                            droppableId={'kanban'}
                        >
                            <DropChild style={{ flexDirection: 'row' }}>
                                {kanbans?.map((kanban, index) => (
                                    <Drag
                                        key={kanban.id}
                                        draggableId={'kanban' + kanban.id}
                                        index={index}
                                    >
                                        <KanbanColumn
                                            kanban={kanban}
                                            key={kanban.id}
                                        ></KanbanColumn>
                                    </Drag>
                                ))}
                            </DropChild>
                        </Drop>
                        <CreatKanban></CreatKanban>
                    </ColumnsContainer>
                )}

                <TaskModal></TaskModal>
            </ScreenContainer>
        </DragDropContext>
    )
}
export const useDragEnd = () => {
    const { data: kanbans } = useKanbans(useKanbanSearchParams())
    const { mutate: reorderKanban } = useReorderKanban()
    const { mutate: reorderTask } = useReorderTask()
    const { data: allTasks } = useTasks()
    return useCallback(
        ({ source, destination, type }: DropResult) => {
            if (!destination) return
            // 给看板排序
            if (type === 'COLUMN') {
                const fromId = kanbans?.[source.index].id
                const toId = kanbans?.[destination.index].id
                if (!fromId || !toId || fromId === toId) return
                const type =
                    destination.index > source.index ? 'after' : 'before'
                reorderKanban({ fromId, referenceId: toId, type })
            }
            // task排序
            if (type === 'ROW') {
                const fromKanbanId = +source.droppableId
                const toKanbanId = +destination.droppableId
                // 不能跨看板移动
                // if(fromKanbanId!==toKanbanId ) return
                const fromTask = allTasks?.filter(
                    (task) => task.kanbanId === fromKanbanId
                )[source.index]
                const toTask = allTasks?.filter(
                    (task) => task.kanbanId === fromKanbanId
                )[destination.index]
                if (fromKanbanId === toKanbanId && fromTask?.id === toTask?.id)
                    return
                reorderTask({
                    fromId: fromTask!.id,
                    referenceId: toTask!.id,
                    fromKanbanId,
                    toKanbanId,
                    type: destination.index > source.index ? 'after' : 'before',
                })
            }
        },
        [kanbans, reorderKanban, allTasks, reorderTask]
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
