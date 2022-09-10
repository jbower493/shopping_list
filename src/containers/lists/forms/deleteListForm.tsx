import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useDeleteListMutation, useGetListsQuery } from 'utils/api/lists'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'

function DeleteListForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { list } = useGetListsQuery(undefined, {
        selectFromResult: ({ data }) => ({ list: data?.find((currentList) => currentList.id.toString() === listId) })
    })
    const [deleteList, { isLoading }] = useDeleteListMutation()

    return (
        <div>
            <UrlModal title='Delete List' desc={list?.name} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>Are you sure you want to delete this list?</ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <Button
                                key={2}
                                color='error'
                                loading={isLoading}
                                disabled={isLoading}
                                onClick={() => {
                                    deleteList(listId || '')
                                        .unwrap()
                                        .then((result) => {
                                            toast.success(result.message)
                                        })
                                        .finally(() => navigate(-1))
                                }}
                            >
                                Delete
                            </Button>
                        ]}
                    />
                </>
            </UrlModal>
        </div>
    )
}

export default DeleteListForm
