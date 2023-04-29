// 跟看板数据拿取有关的hook

import { useHttp } from 'utils/http'
import { Epic } from 'types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp()

    // useQuery第一个参数可以类似useEffect监听
    return useQuery<Epic[]>(['epics', param], () =>
        client('epics', { data: param })
    )
}

export const useAddEpic = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Epic>) =>
            client(`epics`, {
                data: params,
                method: 'POST',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('epics'),
        }
    )
}

export const useEditEpic = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Epic>) =>
            client(`epics`, {
                data: params,
                method: 'PATCH',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('epics'),
        }
    )
}

export const useDeleteEpic = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        ({ id }: { id: number }) =>
            client(`epics/${id}`, {
                method: 'DELETE',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('epics'),
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

export const useReorderEpic = () => {
    const client = useHttp()
    const queryClient = useQueryClient()

    return useMutation(
        (params: SortProps) => {
            return client('epics/reorder', {
                data: params,
                method: 'post',
            })
        },
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('epics'),
        }
    )
}
