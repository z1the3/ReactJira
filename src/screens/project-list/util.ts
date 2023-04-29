import { useUrlQueryParam } from 'utils/url'
import { useMemo } from 'react'
import { useProject } from 'utils/project'

export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam,
    ] as const
}

// 用url管理项目模态框的状态
export const useProjectModal = () => {
    // 直接从url中读数据然后生成状态
    const [projectCreate, setProjectCreate] = useUrlQueryParam([
        'projectCreate',
    ])
    const open = () => setProjectCreate({ projectCreate: true })
    // 如果是false最好url中什么也不显示
    const close = () => {
        projectCreate.projectCreate
            ? setProjectCreate({ projectCreate: undefined })
            : setEditingProjectId({ editingProjectId: undefined })
    }

    const [editingProjectId, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId',
    ])

    const { data, isLoading } = useProject(
        Number(editingProjectId.editingProjectId)
    )

    const startEdit = (id: number) =>
        setEditingProjectId({ editingProjectId: id })

    // 返回对象，可以不记顺序拿出变量，但是重命名需要加{a:b,c:d}
    // 返回元组，必须按顺序拿出变量，但是不需要重命名
    return [
        // 在创建project或修改projectID时都要打开模态框
        projectCreate.projectCreate === 'true' ||
            Boolean(editingProjectId.editingProjectId),
        open,
        close,
        startEdit,
        editingProjectId,
        isLoading,
    ] as const
}
