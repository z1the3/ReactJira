import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { cleanObject } from 'utils'
import type { URLSearchParamsInit } from 'react-router-dom'
// 获取返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // 利用react-router给的hooks,返回一个类似map的结果
    // 传入['name','xx'],返回{'name':'a','xx':'b'}
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(
            () =>
                keys.reduce((prev, key) => {
                    // 这里加个中括号，把key强行表示为变量
                    // ||''可以排除对象里不能加入null的情况
                    return { ...prev, [key]: searchParams.get(key) || '' }
                }, {} as { [key in K]: string }),
            [searchParams]
        ),
        // 优化setSearchParam方法，限定参数名称只能是use出来的name和personID
        (params: Partial<{ [key in K]: unknown }>) => {
            // 后键值对替代前键值对
            const o = cleanObject({
                ...Object.fromEntries(searchParams),
                ...params,
            }) as URLSearchParamsInit
            return setSearchParam(o)
        },
    ] as const
}

// 为什么加as const?
// 以下类型为(string | number | {gender: string;})[]
// const a = ['jack',12,{gender:'male'}]

// 以下类型为readonly["jack", 12, {readonly gender: "male";}]
// const a = ['jack',12,{gender:'male'}] as const

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams()
    return (params: { [key in string]: unknown }) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params,
        }) as URLSearchParamsInit
        return setSearchParam(o)
    }
}
