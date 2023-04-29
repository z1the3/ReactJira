import { SearchPanel } from './search-panel'

import { List } from './list'
import {
    cleanObject,
    useMount,
    useDebounce,
    useDocumentTitle,
} from '../../utils'
import styled from '@emotion/styled'
import { useProjectModal, useProjectsSearchParams } from './util'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/use-users'
import { ErrorBox, Row } from 'components/lib'
import { Button, Typography } from 'antd'

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表', false)
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data } = useProjects(useDebounce(param, 200))
    const [state, open] = useProjectModal()
    // 存储所有user的列表users,
    // const {data:users} = useUsers()
    const users = useUsers()
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button
                    style={{ padding: 0 }}
                    onClick={() => {
                        open()
                    }}
                    type={'link'}
                >
                    创建项目
                </Button>
            </Row>
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users.data!}
            ></SearchPanel>
            <ErrorBox error={error}></ErrorBox>
            <List
                list={data || []}
                users={users.data!}
                loading={isLoading}
            ></List>
        </Container>
    )
}

// 错误输出
// ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding: 3.2rem;
`
