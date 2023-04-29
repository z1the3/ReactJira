import { useHttp } from 'utils/http'
import { Project } from 'types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()

    // useQuery第一个参数可以类似useEffect监听
    return useQuery<Project[]>(['projects', param], () =>
        client('projects', { data: param })
    )
}

export const useEditProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    // const [searchParams,setSearchParams] = useProjectsSearchParams()
    // const queryKey=['projects',searchParams]

    // useMutation的第二个参数，可以用来retry
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, {
                method: 'PATCH',
                data: params,
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('projects'),
            // mutation一发生，onMutate立即被调用，把本地缓存直接修改（无视请求有没有发生成功
            // 但是这样就需要回滚机制
            // async onMutate(target){
            //     const previousItems = queryClient.getQueryData(queryKey)
            //     queryClient.setQueryData(queryKey,(old?:Project[])=>{
            //         return old?.map(project=>project.id===target.id?{...project,...target}:project)||[]
            //     })
            //     return {previousItems}
            // },
            // onError(error,newItem,context){
            //     queryClient.setQueryData(queryKey,(context as {previousItems:Project[]}).previousItems)
            // }
        }
    )
}

export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/`, {
                data: params,
                method: 'POST',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('projects'),
        }
    )
}

// 查找project详情
// useQuery第三个参数，配置，可以配置如果没有id啥也不做
// 只有当id有值才会触发这个usehoook
export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(
        ['project', { id }],
        () => client(`projects/${id}`),
        {
            enabled: !!id,
        }
    )
}

export const useDeleteProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        ({ id }: { id: number }) =>
            client(`projects/${id}`, {
                method: 'DELETE',
            }),
        {
            // 把query这一给删掉,达到retry的效果
            onSuccess: () => queryClient.invalidateQueries('projects'),
        }
    )
}
