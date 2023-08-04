import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { menusQueryKey, useDeleteMenuMutation } from 'containers/menus/queries'
import { useGetMenusQuery } from 'containers/menus/queries'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'

function DeleteMenuForm() {
    const navigate = useNavigate()
    const { menuId } = useParams()

    const { data: getMenusData } = useGetMenusQuery()

    const menu = getMenusData?.find((currentMenu) => currentMenu.id.toString() === menuId)

    const { mutate: deleteMenu, isLoading: isDeleteMenuLoading } = useDeleteMenuMutation()

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
                                loading={isDeleteMenuLoading}
                                disabled={isDeleteMenuLoading}
                                onClick={() => {
                                    deleteMenu(menuId || '', {
                                        onSuccess: (res) => {
                                            toast.success(res.data.message)
                                            queryClient.invalidateQueries(menusQueryKey())
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

export default DeleteMenuForm
