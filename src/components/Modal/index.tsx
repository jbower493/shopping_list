import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

export type OnClose = () => void

interface ModalProps {
    children: JSX.Element
    title?: string
    description?: string
    open: boolean
    onClose: OnClose
}

function Modal({ children, title, description, open, onClose }: ModalProps) {
    return (
        <Transition show={open} as={Fragment}>
            <Dialog className='relative z-50' onClose={onClose}>
                <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100'>
                    <div className='fixed inset-0 bg-black/40' aria-hidden='true' />
                </Transition.Child>

                <div className='fixed inset-0 flex items-center justify-center p-4'>
                    <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100'>
                        <Dialog.Panel className='relative w-full max-w-2xl max-h-96 rounded-xl bg-white p-4'>
                            <>
                                {title ? <Dialog.Title className='mb-1'>{title}</Dialog.Title> : ''}
                                {description ? <Dialog.Description className='mb-6'>{description}</Dialog.Description> : ''}
                                {children}
                                <button className='absolute top-4 right-4' type='button' onClick={onClose}>
                                    <XIcon className='text-black w-6' />
                                </button>
                            </>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal
