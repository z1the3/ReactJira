import { useState, useCallback, useReducer } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
    error: Error | null
    data: D | null
    stat: 'idle' | 'loading' | 'error' | 'success'
}

// 可以配置是抛出promise（用catch) 还是抛出错误（用try catch)
const defaultConfig = {
    throwOnError: false,
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null,
}

export const useAsync = <D>(
    initialState?: State<D>,
    initialConfig?: typeof defaultConfig
) => {
    const config = { ...defaultConfig, ...initialConfig }
    const mountedRef = useMountedRef()
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => {
            return { ...state, ...action }
        },
        {
            ...defaultInitialState,
            ...initialState,
        }
    )
    const setData = (data: D) =>
        dispatch({
            data,
            stat: 'success',
            error: null,
        })
    const setError = (error: Error) =>
        dispatch({
            error,
            stat: 'error',
            data: null,
        })

    const [retry, setRetry] = useState(() => () => {})
    // run用来触发异步请求
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入promise类型数据')
            }
            // 在每一次run时保留本次run的promise,下一次再重新执行一次
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), { retry: runConfig.retry })
                }
            })
            dispatch({ ...state, stat: 'loading' })
            return promise
                .then((data) => {
                    if (mountedRef.current) {
                        setData(data)
                    }
                    return data
                })
                .catch((error) => {
                    // catch会消化异常，如果不主动抛出，外面是接受不到异常的
                    // 不能只return error，要return Promise.reject(error)
                    // setError(error)
                    if (config.throwOnError) return error
                    return Promise.reject(error)
                })
        },
        [config.throwOnError, mountedRef, setData, state]
    )

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // retry被调用时重新跑一遍run，让state刷新一遍
        retry,
        ...state,
    }
    // ...state中包含data,stat,error
}
