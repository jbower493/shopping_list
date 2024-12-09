import React, { ReactElement, cloneElement } from 'react'

interface ModalFooterProps {
    buttons: ReactElement[]
}

function ModalFooter({ buttons }: ModalFooterProps) {
    return <footer className='p-4 bg-gray-100 flex gap-2 justify-end'>{buttons.map((button, index) => cloneElement(button, { key: index }))}</footer>
}

export default ModalFooter
