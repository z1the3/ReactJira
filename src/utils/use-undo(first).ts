import { useState, useCallback } from 'react'

// initialCurrent初始值且为当前值
export const useUndo = <T>(initialCurrent: T) => {
    const [state, setState] = useState({
        past: [] as T[],
        current: initialCurrent,
        future: [] as T[],
    })

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => {
        // setState里放回调函数。参数是当前state
        setState((currentState) => {
            const { past, current, future } = currentState
            // 为了不加canUndo的依赖，这里直接判断
            if (past.length === 0) return currentState
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)

            return {
                past: newPast,
                current: previous,
                future: [current, ...future],
            }
        })
    }, [])

    const redo = useCallback(() => {
        setState((currentState) => {
            const { past, current, future } = currentState
            if (future.length === 0) return currentState

            const next = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, current],
                current: next,
                future: newFuture,
            }
        })
    }, [])

    // 使用set会将把将来置空，基于所处位置set
    const set = useCallback((newCurrent: T) => {
        setState((currentState) => {
            const { past, current, future } = currentState
            if (newCurrent === current) return currentState

            return {
                past: [...past, current],
                current: newCurrent,
                future: [],
            }
        })
    }, [])

    const reset = useCallback((newCurrent: T) => {
        setState(() => {
            return {
                past: [],
                current: newCurrent,
                future: [],
            }
        })
    }, [])

    return [state, { set, reset, undo, redo, canUndo, canRedo }]
}
