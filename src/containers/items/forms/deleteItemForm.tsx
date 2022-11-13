import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useDeleteItemMutation, useGetItemsQuery } from 'utils/api/items'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'

function DeleteItemForm() {
    const navigate = useNavigate()
    const { itemId } = useParams()

    const { item } = useGetItemsQuery(undefined, {
        selectFromResult: ({ data }) => ({ item: data?.find((currentItem) => currentItem.id.toString() === itemId) })
    })
    const [deleteItem, { isLoading }] = useDeleteItemMutation()

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
                                loading={isLoading}
                                disabled={isLoading}
                                onClick={() => {
                                    deleteItem(itemId || '')
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

export default DeleteItemForm
