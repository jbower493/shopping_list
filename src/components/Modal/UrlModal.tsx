import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal'
import type { OnClose } from 'components/Modal'

interface UrlModalProps {
    children: JSX.Element
    onClose: OnClose
    title?: string
    description?: string
}

function UrlModal({ children, onClose, title, description }: UrlModalProps) {
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setModalOpen(true)
    }, [])

    return (
        <Modal open={modalOpen} onClose={onClose} title={title} description={description}>
            {children}
        </Modal>
    )
}

export default UrlModal
