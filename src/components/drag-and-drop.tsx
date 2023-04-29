import React from 'react'
import { ReactNode } from 'react'
import {
    Draggable,
    DraggableProps,
    Droppable,
    DroppableProps,
    DroppableProvided,
    DroppableProvidedProps,
} from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

export const Drop = ({ children, ...props }: DropProps) => {
    return (
        <Droppable {...props}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {' '}
                    {children}
                    {provided?.placeholder}
                </div>
            )}
        </Droppable>
    )
}

type DropChildProps = Partial<
    { provided: DroppableProvided } & DroppableProvidedProps
> &
    React.HTMLAttributes<HTMLDivElement> & { flexD?: string }
// forwardRef能让用户使用时能使用ref
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
    ({ children, flexD, ...props }, ref) => (
        <div
            ref={ref}
            style={{
                display: 'flex',
                flexDirection: flexD === 'vertical' ? 'column' : 'row',
            }}
        >
            {children}
            {props.provided?.placeholder}
        </div>
    )
)

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }

export const Drag = ({ children, ...props }: DragProps) => {
    return (
        <Draggable {...props}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {' '}
                    {children}
                </div>
            )}
        </Draggable>
    )
}
