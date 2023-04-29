// 给自封装的id过滤为数字的列表再封装一个用户状态
import { useUsers } from 'utils/use-users'
import { IdSelect } from './id-select'
import { User } from 'types'

// typepf +  componentprops获取组件上的props
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const users = useUsers()
    return <IdSelect options={users.data || []} {...props}></IdSelect>
}
