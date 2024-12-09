import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useDeleteListMutation, listsQueryKey, useListsQuery } from 'containers/lists/queries'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'

function DeleteListForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { data: getListsData } = useListsQuery()

    const list = getListsData?.find((currentList) => currentList.id.toString() === listId)

    const { mutate: deleteList, isLoading: isDeleteListLoading } = useDeleteListMutation()

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
                                loading={isDeleteListLoading}
                                disabled={isDeleteListLoading}
                                onClick={() => {
                                    deleteList(listId || '', {
                                        onSuccess: (res) => {
                                            toast.success(res.message)
                                            queryClient.invalidateQueries(listsQueryKey())
                                        },
                                        onSettled: () => navigate(-1)
                                    })
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
