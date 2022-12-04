import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useDeleteMenuMutation, useGetMenusQuery } from 'utils/api/menus'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'

function DeleteMenuForm() {
    const navigate = useNavigate()
    const { menuId } = useParams()

    const { menu } = useGetMenusQuery(undefined, {
        selectFromResult: ({ data }) => ({ menu: data?.find((currentMenu) => currentMenu.id.toString() === menuId) })
    })
    const [deleteMenu, { isLoading }] = useDeleteMenuMutation()

    return (
        <div>
            <UrlModal title='Delete Menu' desc={menu?.name} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>Are you sure you want to delete this menu?</ModalBody>
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
                                    deleteMenu(menuId || '')
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

export default DeleteMenuForm
