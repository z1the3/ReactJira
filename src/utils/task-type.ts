// 拿task列表

import { useHttp } from 'utils/http'
import { Task, Project, TaskType } from 'types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useTaskTypes = () => {
    const client = useHttp()

    // 直接获取所有的tasks
    return useQuery<TaskType[]>(['taskType'], () => client('taskTypes'))
}
