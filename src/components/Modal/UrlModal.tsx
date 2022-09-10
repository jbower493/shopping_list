import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal'
import type { OnClose } from 'components/Modal'

interface UrlModalProps {
    children: JSX.Element
    onClose: OnClose
    title: string
    desc?: string
}

function UrlModal({ children, onClose, title, desc }: UrlModalProps) {
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setModalOpen(true)
    }, [])

    return (
        <Modal open={modalOpen} onClose={onClose} title={title} desc={desc}>
            {children}
        </Modal>
    )
}

export default UrlModal
