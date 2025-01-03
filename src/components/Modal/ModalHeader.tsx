import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface ModalHeaderProps {
    title: string
    desc?: string
}

function ModalHeader({ title, desc }: ModalHeaderProps) {
    return (
        <header className='p-4 border-b border-b-primary'>
            <Dialog.Title>{title}</Dialog.Title>
            {desc ? <Dialog.Description className='mt-2'>{desc}</Dialog.Description> : ''}
        </header>
    )
}

export default ModalHeader
