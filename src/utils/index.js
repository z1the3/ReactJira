import { useEffect, useState } from 'react'

export const isFalsy = (value) => (value === 0 ? false : !value)

// 把对象里值为空的键直接删掉，这样url中不再携带非必要的
// 还会产生find效果的key

// 应该写成纯函数，防止污染
export const cleanObject = (obj) => {
    const result = { ...obj }
    Object.keys(obj).forEach((key) => {
        const value = obj[key]

        if (isFalsy(value)) {
            delete result[key]
        }
    })

    return result
}

export const useMount = (callback) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

// 对监听value的useEffect，设置一个取消定时器的回调，于是
// 基本上只有最后一次才不会被取消
export const useDebounce = (value, delay) => {
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
