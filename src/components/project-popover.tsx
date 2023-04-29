import { useProjects } from 'utils/project'
import { Popover, Typography, List, Divider, Button } from 'antd'
import styled from '@emotion/styled'
import { useProjectModal } from 'screens/project-list/util'
import { Project } from 'types'

export const ProjectPopover = () => {
    const [stat, open] = useProjectModal()
    const { data: projects, refetch } = useProjects()
    const pinnedProjects = projects?.filter((project: Project) => project.pin)

    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((pinProject: Project) => (
                    <List.Item key={pinProject.id}>
                        <List.Item.Meta
                            title={pinProject.name}
                        ></List.Item.Meta>
                    </List.Item>
                ))}
            </List>
            <Divider />
            <Button style={{ padding: 0 }} onClick={() => open()} type={'link'}>
                创建项目
            </Button>
        </ContentContainer>
    )

    // 每次显示或不显示时，应该重新请求更新里面的数据，利用onVisibleChange
    return (
        <Popover
            onOpenChange={() => refetch()}
            placement="bottom"
            content={content}
        >
            项目
        </Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`
