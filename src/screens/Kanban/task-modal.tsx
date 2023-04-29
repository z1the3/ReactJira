import { Button, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { Task } from 'types'
import { useDeleteTask } from 'utils/task'
import { useEditTask, useTasksModal } from './util'
import { EpicTypeSelect } from 'components/epic-type-select'

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTaskId, editingTask, close } = useTasksModal()
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask()
    const { mutate: deleteTask } = useDeleteTask()

    const onCancel = () => {
        close()
        form.resetFields()
    }

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        close()
    }

    const startDelete = () => {
        close()
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务吗',
            onOk() {
                return deleteTask({ id: +editingTaskId })
            },
        })
    }

    useEffect(() => {
        form.setFieldValue('form', { ...editingTask })
    }, [form, editTask])

    return (
        <Modal
            forceRender={true}
            onCancel={onCancel}
            onOk={onOk}
            okText={'确认'}
            cancelText={'取消'}
            confirmLoading={editLoading}
            title={'编辑'}
            open={!!editingTaskId}
        >
            <Form initialValues={editingTask} form={form}>
                <Form.Item
                    label={'任务名'}
                    name={'name'}
                    rules={[{ required: true, message: '请输入任务名' }]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item label={'经办人'} name={'processorId'}>
                    <UserSelect defaultOptionName={'经办人'}></UserSelect>
                </Form.Item>
                <Form.Item label={'类型'} name={'typeId'}>
                    <TaskTypeSelect></TaskTypeSelect>
                </Form.Item>
                <Form.Item label={'任务组'} name={'epicId'}>
                    <EpicTypeSelect></EpicTypeSelect>
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'right' }}>
                <Button
                    onClick={startDelete}
                    style={{ fontSize: '14px' }}
                    size={'small'}
                >
                    删除
                </Button>
            </div>
        </Modal>
    )
}
