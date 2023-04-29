import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useAddProject, useEditProject } from 'utils/project'
import { useProjectModal } from './util'

export const ProjectModal = () => {
    const [
        projectModalOpen,
        open,
        close,
        startEdit,
        editingProject,
        isLoading,
    ] = useProjectModal()
    const title = editingProject.editingProjectId ? '编辑项目' : '创建项目'
    const useSubmitProject = editingProject.editingProjectId
        ? useEditProject
        : useAddProject
    const [form] = useForm()
    // mutate同步方法，mutateAsync拿异步的
    const { mutateAsync, error, isLoading: mutateLoading } = useSubmitProject()
    // 当监测到editingProject改变时，要把form刷新一遍
    useEffect(() => {
        form.setFieldValue('form', { ...editingProject })
    }, [editingProject.editingProjectId, form])
    const onFinish = (values: any) => {
        // 如果editingProject不存在，展开的是undefined，无影响
        mutateAsync({
            id: Number(editingProject.editingProjectId),
            ...values,
        }).then(() => {
            form.resetFields()
            close()
        })
    }
    const closeModal = () => {
        form.resetFields()
        close()
    }

    // formItem会自动给Input加上value和onChange,自动代理
    // ***由于上面form在创建时dom还没生成，所以会报错，加上forceRender属性即可解决
    return (
        <Drawer
            forceRender={true}
            onClose={closeModal}
            open={projectModalOpen}
            width={'100%'}
        >
            <Container>
                {isLoading ? (
                    <Spin size={'large'} />
                ) : (
                    <>
                        <h1>{title}</h1>
                        <ErrorBox error={error}></ErrorBox>
                        <Form
                            layout={'vertical'}
                            style={{ width: '40rem' }}
                            onFinish={onFinish}
                            form={form}
                        >
                            <Form.Item
                                label={'名称'}
                                name={'name'}
                                rules={[
                                    { required: true, message: '请输入项目名' },
                                ]}
                            >
                                <Input placeholder={'请输入项目名称'}></Input>
                            </Form.Item>
                            <Form.Item
                                label={'部门'}
                                name={'organization'}
                                rules={[
                                    { required: true, message: '请输入部门名' },
                                ]}
                            >
                                <Input placeholder={'请输入部门名称'}></Input>
                            </Form.Item>
                            <Form.Item label={'负责人'} name={'personId'}>
                                <UserSelect
                                    defaultOptionName={'负责人'}
                                ></UserSelect>
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'right' }}>
                                {/* 按钮可能用于编辑也可能用于创建 */}
                                <Button
                                    loading={mutateLoading}
                                    type={'primary'}
                                    htmlType={'submit'}
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
    flex-direction: column;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
