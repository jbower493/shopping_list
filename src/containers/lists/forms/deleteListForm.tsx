import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useDeleteListMutation, useGetListsQuery } from 'utils/api/lists'

function DeleteListForm() {
    const navigate = useNavigate()
    const { listId } = useParams()

    const { list } = useGetListsQuery(undefined, {
        selectFromResult: ({ data }) => ({ list: data?.find((currentList) => currentList.id.toString() === listId) })
    })
    const [deleteList, { isLoading }] = useDeleteListMutation()

    return (
        <div>
            <UrlModal
                title='Delete List'
                description={`Are you sure you want to delete the following list: ${list?.name}`}
                onClose={() => navigate(-1)}
            >
                <div className='flex justify-center'>
                    <Button className='w-24 mr-2' color='secondary' onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Button
                        className='w-24'
                        color='error'
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={() => {
                            deleteList(Number(listId))
                                .unwrap()
                                .then(() => {
                                    toast.success('Successfully deleted list.')
                                })
                                .catch(() => {
                                    toast.error('Failed to delete list.')
                                })
                                .finally(() => navigate(-1))
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </UrlModal>
        </div>
    )
}

export default DeleteListForm
