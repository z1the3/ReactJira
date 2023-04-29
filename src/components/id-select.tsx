import { Raw, User } from 'types'
import { Select } from 'antd'
import { UseQueryResult } from 'react-query/types/react/types'

// 该方法可以复制Select组件上的props
type SelectProps = React.ComponentProps<typeof Select>
// 重写Select的props
export interface IdSelectProps
    extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    // 设为可选因为有时候antd的form组件可以自动加上
    value?: Raw | null | undefined
    onChange?: (value?: number) => void
    defaultOptionName?: string
    options?: { name: string; id: number }[]
}

// value可以传入多种类型的值
// onChange只会回调number|undefined类型
// 当 isNaN(Number(value))为true的时候，代表选择默认类型
// 当选择默认类型的时候，onChange会回调undefined
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return (
        <Select
            value={options?.length ? toNumber(value) : '加载中'}
            onChange={(value) => onChange?.(toNumber(value) || undefined)}
            {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {/* 选项插槽导入用户数据 */}
            {options?.map((option) => (
                <Select.Option value={option.id} key={option.id}>
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
