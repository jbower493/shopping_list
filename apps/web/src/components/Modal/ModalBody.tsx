import React, { ReactNode } from 'react'

interface ModalBodyProps {
    children: ReactNode
}

function ModalHeader({ children }: ModalBodyProps) {
    return <div className='p-4'>{children}</div>
}

export default ModalHeader
