import { QueryKey, useQueryClient } from 'react-query'
import { reorder } from './reorder'
import { Task } from 'types'
import { useState } from 'react'

// 抽象乐观更新 hooks
export const useConfig = (
    queryKey: QueryKey,
    callback: (target: any, old?: any[]) => any[] | undefined
) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    return {
        // 把query这一给删掉,达到retry的效果
        onSuccess: () => {
            setLoading(false)
            return queryClient.invalidateQueries(queryKey)
        },
        loading,
        setLoading,
        async onMutate(target: any) {
            const previousItems: any[] =
                queryClient.getQueryData(queryKey) || []
            let optimistic

            queryClient.setQueryData(queryKey, (old?: any) => {
                optimistic = callback(target, old)
                return optimistic
            })
            // 保留到context里，用于错误处理时回滚
            return previousItems
        },

        // async onMutate(target: any) {
        //     // await queryClient.cancelQueries(queryKey)
        //     const previousItems: any[] = await queryClient.getQueryData(queryKey)!

        //     let optimistic
        //     queryClient.setQueryData(queryKey, (old:any) => {
        //         console.log(target,old)
        //          optimistic =  callback(target, old)
        //         return optimistic
        //     })
        //     return {optimistic}
        // },
        // onSuccess: (result:any,variables:any,context:any)=>{
        //     queryClient.setQueryData(queryKey,(olds:any)=>
        //         olds?.map((old:any)=>(old.id===context.optimistic.id?result:old))
        //     )
        // },
        // // 如果错误了，则回滚
        onError(error: any, newItem: any, context: any) {
            queryClient.setQueryData(queryKey, context.previousItems)
        },
        // retry:3
    }
}

export const useReorderConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => {
        return old || []
    })

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))

export const useReorderTaskConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => {
        // console.log(old)
        // 乐观更新task
        const orderedList = reorder({ list: old, ...target })
        // 由于task排序还可能涉及看板改变，所以加一个改变kanban的，和上面都无关
        return orderedList?.map((item: any) =>
            item.id === target.fromId
                ? { ...item, kanbanId: target.toKanbanId }
                : item
        )
    })
