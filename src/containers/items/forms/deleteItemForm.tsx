import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { getItemsKey, useDeleteItemMutation } from '../queries'
import { useGetItemsQuery } from '../queries'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'

function DeleteItemForm() {
    const navigate = useNavigate()
    const { itemId } = useParams()

    const { data: getItemsData } = useGetItemsQuery()

    const item = getItemsData?.find((currentItem) => currentItem.id.toString() === itemId)

    const { mutate: deleteItem, isLoading: isDeleteItemLoading } = useDeleteItemMutation()

    return (
        <div>
            <UrlModal title='Delete Item' desc={item?.name} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>
                        Are you sure you want to delete this item? Deleting the item will remove it from any lists and recipes that it belongs to.
                    </ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <Button
                                key={2}
                                color='error'
                                loading={isDeleteItemLoading}
                                disabled={isDeleteItemLoading}
                                onClick={() => {
                                    deleteItem(itemId || '', {
                                        onSuccess: (res) => {
                                            toast.success(res.data.message)
                                            queryClient.invalidateQueries(getItemsKey)
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

export default DeleteItemForm
