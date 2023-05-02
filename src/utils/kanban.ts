// 跟看板数据拿取有关的hook

import { useHttp } from 'utils/http'
import { Kanban, Project } from 'types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    useReorderConfig,
    useReorderKanbanConfig,
} from './use-optimistic-options'
import { useKanbanSearchParams } from 'screens/Kanban/util'

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp()

    // useQuery第一个参数可以类似useEffect监听
    return useQuery<Kanban[]>(['kanbans', param], () =>
        client('kanbans', { data: param })
    )
}

export const useAddKanban = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Kanban>) =>
            client(`kanbans`, {
                data: params,
                method: 'POST',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('kanbans'),
        }
    )
}

export const useDeleteKanban = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        ({ id }: { id: number }) =>
            client(`kanbans/${id}`, {
                method: 'DELETE',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('kanbans'),
        }
    )
}

export interface SortProps {
    // 要重新排序的item
    fromId: number
    // 目标item;
    referenceId: number
    type: 'before' | 'after'
}

export const useReorderKanban = () => {
    const client = useHttp()
    const queryKey = ['kanbans', useKanbanSearchParams()]
    return useMutation(
        (params: SortProps) => {
            return client('kanbans/reorder', {
                data: params,
                method: 'POST',
            })
        },
        useReorderKanbanConfig(queryKey)
        // useReorderConfig(queryKey)
    )
}
