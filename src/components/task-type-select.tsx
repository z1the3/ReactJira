// 给自封装的id过滤为数字的列表再封装一个用户状态
import { useUsers } from 'utils/use-users'
import { IdSelect } from './id-select'
import { User } from 'types'
import { useTaskTypes } from 'utils/task-type'

// typepf +  componentprops获取组件上的props
export const TaskTypeSelect = (
    props: React.ComponentProps<typeof IdSelect>
) => {
    const { data: taskTypes } = useTaskTypes()
    return (
        <IdSelect
            defaultOptionName="类型"
            options={taskTypes || []}
            {...props}
        ></IdSelect>
    )
}
