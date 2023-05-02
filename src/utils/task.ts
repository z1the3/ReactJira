// 跟task数据拿取有关的hook

import { useHttp } from 'utils/http'
import { Task, Project } from 'types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    useReorderConfig,
    useReorderTaskConfig,
} from './use-optimistic-options'
import {
    useTasksSearchParams,
    useTasksSearchParamsPanels,
} from 'screens/Kanban/util'
import { useProjectsSearchParams } from 'screens/project-list/util'

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()

    // useQuery第一个参数可以类似useEffect监听
    return useQuery<Task[]>(['tasks', param], () =>
        client('tasks', { data: param })
    )
}

export const useAddTask = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks`, {
                data: params,
                method: 'POST',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('tasks'),
        }
    )
}

export const useEditTask = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks`, {
                data: params,
                method: 'PATCH',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('tasks'),
        }
    )
}

export const useDeleteTask = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        ({ id }: { id: number }) =>
            client(`tasks/${id}`, {
                method: 'DELETE',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('tasks'),
        }
    )
}

export interface SortProps {
    // 要重新排序的item
    fromId: number
    // 目标item;
    referenceId: number
    type: 'before' | 'after'
    fromKanbanId?: number
    toKanbanId?: number
}
export const useReorderTask = () => {
    const client = useHttp()
    const queryKey = ['tasks', useTasksSearchParamsPanels()]
    return useMutation(
        (params: SortProps) => {
            // const tail =  reorderTaskConfig.loading?  Promise.resolve()
            // :client('tasks/reorder', {
            //     data: params,
            //     method: 'post',
            // })

            // return tail
            return client('tasks/reorder', {
                data: params,
                method: 'post',
            })
        },
        useReorderTaskConfig(queryKey)
        // useReorderConfig(queryKey)
    )
}
