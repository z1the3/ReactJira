// 收藏的组件

import { Rate } from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
    // 扩展我们的两个属性
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

export const Pin = (props: PinProps) => {
    const { checked, onCheckedChange, ...restProps } = props
    // Rate组件，count设置星的上限，value设置星的个数
    return (
        <Rate
            count={1}
            value={checked ? 1 : 0}
            onChange={(num) => {
                onCheckedChange(Boolean(num))
            }}
            {...restProps}
        />
    )
}
