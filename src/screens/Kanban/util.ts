import { useCallback, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation } from 'react-router'
import { Task } from 'types'
import { useDebounce } from 'utils'
import { useHttp } from 'utils/http'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    // 匹配链接里的数字id
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

// 通过useProject和id拿到项目
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

// 产生queryKey用于根据projectId拿kanban信息，先拿projectId
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

// 根据上面的返回结果，返回query所需的key
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]
export const useTasksSearchParams = (id: number) => ({ kanbanId: id })

export const useTasksSearchParamsPanels = (kanbanId?: number) => {
    const [param, setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId',
    ])

    let deboucedName = useDebounce(param.name, 10)
    const projectId = useProjectIdInUrl()
    return useMemo(
        () => ({
            kanbanId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            // todo
            name: param.name,
        }),
        [projectId, param]
    )
}

// export const useTasksQueryKey = () => ['tasks',useTasksSearchParams()]
export const useTask = (id?: number) => {
    const client = useHttp()
    return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`, {}), {
        enabled: !!id,
    })
}
export const useEditTask = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks/${params.id}`, {
                method: 'PATCH',
                data: params,
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('tasks'),
        }
    )
}

export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
        'editingTaskId',
    ])
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
    const startEdit = useCallback(
        (id: number) => {
            setEditingTaskId({ editingTaskId: id })
        },
        [setEditingTaskId]
    )
    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: '' })
    }, [setEditingTaskId])
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading,
    }
}
