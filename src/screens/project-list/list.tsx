import { Table, TableProps, Dropdown, Button, Menu, MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { User } from 'types'
import { useDeleteProject, useEditProject } from 'utils/project'
import { Pin } from 'components/pin'
import { useProjectModal } from './util'

// TODO 把所有ID改成number类型
export interface Project {
    id: number
    name: string
    personId: number
    pin: boolean
    created: number
    organization: string
}

interface ListProps extends TableProps<Project> {
    list: Project[]
    users: User[]
    // projectButton: JSX.Element;
}

export const List = ({ list, users, ...props }: ListProps) => {
    const { mutate } = useEditProject()
    const { mutate: mutateDelete } = useDeleteProject()
    const pinProject = (id: number) => {
        return (pin: boolean) => {
            mutate({ id, pin })
        }
    }
    const deleteProject = (id: number) => () => mutateDelete({ id })
    const editProject = (id: number) => () => startEdit(id)
    const [
        projectModalOpen,
        open,
        close,
        startEdit,
        editingProject,
        isLoading,
    ] = useProjectModal()

    // const items: MenuProps['items'] = [

    // ]
    // localeCompare可以比较中文字符
    // 负责人对于的每一列id不能通过dataIndex简单找到，需要使用render
    return (
        <Table
            pagination={false}
            dataSource={list}
            columns={[
                {
                    title: (
                        <Pin
                            onCheckedChange={() => {}}
                            checked={true}
                            disabled={true}
                        />
                    ),
                    render(value, project) {
                        return (
                            <Pin
                                checked={project.pin}
                                key={project.id}
                                onCheckedChange={
                                    // 这里由于project.id和pin拿到的时机不同
                                    // 所以可以用柯里化优化

                                    pinProject(project.id)
                                }
                            />
                        )
                    },
                },
                {
                    title: '名称',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render: (value, project) => {
                        return (
                            <Link
                                key={project.id}
                                to={`projects/${String(project.id)}`}
                            >
                                {project.name}
                            </Link>
                        )
                    },
                },
                {
                    title: '所属',
                    dataIndex: 'organization',
                    render: (value, project) => {
                        return (
                            <span key={project.id}>
                                {list.find((li) => li.id === project.id)
                                    ?.organization || '未知'}
                            </span>
                        )
                    },
                },
                {
                    title: '负责人',
                    render: (value, item) => {
                        return (
                            <span key={item.id}>
                                {users.find((user) => user.id === item.personId)
                                    ?.name || '未知'}
                            </span>
                        )
                    },
                },
                {
                    title: '创建时间',
                    render: (value, project) => {
                        return (
                            <span key={project.id}>
                                {project.created
                                    ? dayjs(project.created).format(
                                          'YYYY/MM/DD'
                                      )
                                    : '无'}
                            </span>
                        )
                    },
                },
                {
                    render(value, record, index) {
                        return (
                            <Dropdown
                                key={record.id}
                                menu={{
                                    items: [
                                        {
                                            key: 1,
                                            label: (
                                                <a
                                                    onClick={editProject(
                                                        record.id
                                                    )}
                                                    key={'edit'}
                                                >
                                                    编辑
                                                </a>
                                            ),
                                        },

                                        {
                                            key: 2,
                                            label: (
                                                <a
                                                    onClick={deleteProject(
                                                        record.id
                                                    )}
                                                    key={'delete'}
                                                >
                                                    删除
                                                </a>
                                            ),
                                        },
                                    ],
                                }}
                            >
                                <Button type={'link'}>...</Button>
                            </Dropdown>
                        )
                    },
                },
            ]}
            {...props}
        ></Table>
    )
}
