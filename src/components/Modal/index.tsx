import { XMarkIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import ModalHeader from './ModalHeader'
import Loader from 'components/Loader'

export type OnClose = () => void

interface ModalProps {
    children: JSX.Element
    title: string
    desc?: string
    open: boolean
    onClose: OnClose
    loading?: boolean
}

const Modal = ({ children, title, desc, open: isOpen, onClose, loading }: ModalProps) => (
    <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
            if (!open) {
                onClose()
            }
        }}
    >
        <Dialog.Portal>
            <Dialog.Overlay className='fixed z-50 inset-0 bg-black/40' />
            <div className='z-50 fixed inset-0 flex items-center justify-center p-4'>
                <Dialog.Content className='relative w-full sm:w-auto sm:max-w-2xl sm:min-w-120 max-h-full rounded-xl bg-white overflow-auto'>
                    <>
                        <ModalHeader title={title} desc={desc} />
                        {loading ? (
                            <div className='w-full h-40 flex justify-center items-center'>
                                <Loader />
                            </div>
                        ) : (
                            children
                        )}
                        <button className='absolute top-4 right-4' type='button' onClick={onClose}>
                            <XMarkIcon className='text-black w-6' />
                        </button>
                    </>
                </Dialog.Content>
            </div>
        </Dialog.Portal>
    </Dialog.Root>
)

export default Modal
