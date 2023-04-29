import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === ''
// 把对象里值为空的键直接删掉，这样url中不再携带非必要的
// 还会产生find效果的key

// 应该写成纯函数，防止污染
export const cleanObject = (obj: { [key: string]: unknown }) => {
    const result = { ...obj }
    Object.keys(obj).forEach((key) => {
        const value = obj[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })

    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

// 对监听value的useEffect，设置一个取消定时器的回调，于是
// 基本上只有最后一次才不会被取消
// setTimeout不传delay默认是0，所以可以不传
export const useDebounce = <T>(value: T, delay?: number): T => {
    // debounceValue的更新频率比value小
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        // useEffect的return会在上次useEffect结束时执行，所以可以写到这里面
        // 清理定时器，相当于会放在下一次useEffect的头部执行
        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])

    // 以新频率return value
    return debouncedValue
}

// 修改文档名
export const useDocumentTitle = (
    title: string,
    keepOnUnmount: boolean = true
) => {
    const oldTitle = useRef(document.title).current
    useEffect(() => {
        document.title = title
    }, [title])

    // 卸载时调用，为了清除状态
    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount, oldTitle])
}

// 重置路由
export const resetRoute = () => (window.location.href = window.location.origin)

// 返回组件内的挂载状态，如果还没挂载或者已经卸载，返回false,否则返回true

export const useMountedRef = () => {
    const monuntedRef = useRef(false)
    useEffect(() => {
        monuntedRef.current = true
        return () => {
            monuntedRef.current = false
        }
    })

    return monuntedRef
}
