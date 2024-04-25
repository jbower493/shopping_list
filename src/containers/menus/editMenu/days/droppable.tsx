import { ReactNode } from 'react'

interface DroppableProps {
    className?: string
    children: ReactNode
    onDragOver: React.DragEventHandler<HTMLDivElement>
    onDrop: React.DragEventHandler<HTMLDivElement>
}

export function Droppable({ className, children, onDragOver: onDragOverProp, onDrop: onDropProp }: DroppableProps) {
    function onDragOver(e: Parameters<DroppableProps['onDragOver']>[0]) {
        e.preventDefault()

        // Call the passed in onDragOver
        onDragOverProp(e)
    }

    function onDrop(e: Parameters<DroppableProps['onDrop']>[0]) {
        e.preventDefault()

        // Call the passed in onDrop
        onDropProp(e)
    }

    return (
        <div className={className} onDragOver={onDragOver} onDrop={onDrop}>
            {children}
        </div>
    )
}
