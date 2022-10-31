import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import ModalHeader from 'components/Modal/ModalHeader'

export type OnClose = () => void

interface ModalProps {
    children: JSX.Element
    title: string
    desc?: string
    open: boolean
    onClose: OnClose
}

function Modal({ children, title, desc, open, onClose }: ModalProps) {
    return (
        <Transition show={open} as={Fragment}>
            <Dialog className='relative z-50' onClose={onClose}>
                <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100'>
                    <div className='fixed inset-0 bg-black/40' aria-hidden='true' />
                </Transition.Child>

                <div className='fixed inset-0 flex items-center justify-center p-4'>
                    <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100'>
                        <Dialog.Panel className='relative w-full sm:w-auto sm:max-w-2xl sm:min-w-120 max-h-96 rounded-xl bg-white overflow-hidden'>
                            <>
                                <ModalHeader title={title} desc={desc} />
                                {children}
                                <button className='absolute top-4 right-4' type='button' onClick={onClose}>
                                    <XMarkIcon className='text-black w-6' />
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
