import { useProjects } from 'utils/project'
import { Popover, Typography, List, Divider, Button } from 'antd'
import styled from '@emotion/styled'
import { useProjectModal } from 'screens/project-list/util'
import { Project, User } from 'types'
import { useUsers } from 'utils/use-users'

export const UserPopover = () => {
    const { data: users, refetch } = useUsers()

    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>组员列表</Typography.Text>
            <List>
                {users?.map((user: User) => (
                    <List.Item key={user.id}>
                        <List.Item.Meta
                            key={user.id}
                            title={user.name}
                        ></List.Item.Meta>
                    </List.Item>
                ))}
            </List>
            <Divider />
        </ContentContainer>
    )

    // 每次显示或不显示时，应该重新请求更新里面的数据，利用onVisibleChange
    return (
        <Popover
            onOpenChange={() => refetch()}
            placement="bottom"
            content={content}
        >
            组员
        </Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`
