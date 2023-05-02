// 给自封装的id过滤为数字的列表再封装一个用户状态
import { useUsers } from 'utils/use-users'
import { IdSelect } from './id-select'
import { User } from 'types'
import { useEpics } from 'utils/epic'
import { useProjectIdInUrl } from 'screens/Kanban/util'

// typeof +  componentprops获取组件上的props
export const EpicTypeSelect = (
    props: React.ComponentProps<typeof IdSelect>
) => {
    let { data: epics } = useEpics()

    const projectId = useProjectIdInUrl()
    epics = epics?.filter((epic) => epic.projectId === projectId)
    return (
        <IdSelect
            defaultOptionName="任务组"
            options={epics || []}
            {...props}
        ></IdSelect>
    )
}
