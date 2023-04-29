import styled from '@emotion/styled'
import { Typography } from 'antd'

// 封装一个组件样式，实现水平均匀分布

export const Row = styled.div<{
    gap?: number | boolean
    between?: boolean
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
        props.between ? 'space-between' : undefined};
    margin-bottom: ${(props) => props.marginBottom + 'rem'};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${(props) =>
            typeof props.gap === 'number'
                ? props.gap + 'rem'
                : props.gap
                ? '2rem'
                : undefined};
    }
`

// 类型守卫

const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return (
            <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
        )
    }
    return null
}

// 有外边距的Container
export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`
