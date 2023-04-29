import { DrawerProps } from 'antd/es/drawer'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import styled from '@emotion/styled'
import { ErrorBox } from 'components/lib'
import { useForm } from 'antd/es/form/Form'
import { useAddEpic } from 'utils/epic'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useProjectIdInUrl } from 'screens/Kanban/util'

// onClose必须要传event，这里改写一下
export const CreateEpic = (
    props: Pick<DrawerProps, 'open'> & { onClose: () => void }
) => {
    const { mutate: addEpic, isLoading, error } = useAddEpic()
    const projectId = useProjectIdInUrl()
    const [form] = useForm()
    const onFinish = async (values: any) => {
        await addEpic({ ...values, projectId })
        props.onClose()
    }

    useEffect(() => {
        form.resetFields()
    }, [form, props.open])
    return (
        <Drawer
            open={props.open}
            onClose={props.onClose}
            forceRender={true}
            destroyOnClose={true}
            width={'100%'}
        >
            <Container>
                {isLoading ? (
                    <Spin size={'large'} />
                ) : (
                    <>
                        <h1>创建任务组</h1>
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
                                    {
                                        required: true,
                                        message: '请输入任务组名',
                                    },
                                ]}
                            >
                                <Input placeholder={'请输入任务组名称'}></Input>
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'right' }}>
                                {/* 按钮可能用于编辑也可能用于创建 */}
                                <Button
                                    loading={isLoading}
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
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
