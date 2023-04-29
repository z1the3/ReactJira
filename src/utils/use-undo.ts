import { useState, useCallback, useReducer } from 'react'

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
    past: T[]
    current: T
    future: T[]
}

type Action<T> = {
    newCurrent?: T
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, current, future } = state
    const { newCurrent } = action
    // 在useReducer传入undoReducer时，会自动给undoReducer传入state
    switch (action.type) {
        case UNDO: {
            if (past.length === 0) return state
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)

            return {
                past: newPast,
                current: previous,
                future: [current, ...future],
            } as State<T>
        }

        case REDO: {
            if (future.length === 0) return state
            const next = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, current],
                current: next,
                future: newFuture,
            } as State<T>
        }

        case SET: {
            if (newCurrent === current) return state

            return {
                past: [...past, current],
                current: newCurrent,
                future: [],
            } as State<T>
        }
        case RESET: {
            return {
                past: [],
                current: newCurrent,
                future: [],
            } as State<T>
        }
    }
}

// initialCurrent初始值且为当前值
export const useUndo = <T>(initialCurrent: T) => {
    const init = {
        past: [],
        current: initialCurrent,
        future: [],
    } as State<T>

    const [state, dispatch] = useReducer(undoReducer, init)

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => dispatch({ type: UNDO }), [])

    const redo = useCallback(() => dispatch({ type: REDO }), [])

    const set = useCallback(
        (newCurrent: T) => dispatch({ type: SET, newCurrent }),
        []
    )

    const reset = useCallback(
        (newCurrent: T) => dispatch({ type: RESET, newCurrent }),
        []
    )

    return [state, { set, reset, undo, redo, canUndo, canRedo }] as const
}
