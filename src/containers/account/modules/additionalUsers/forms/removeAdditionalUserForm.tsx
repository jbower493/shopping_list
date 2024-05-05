import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import ModalBody from 'components/Modal/ModalBody'
import ModalFooter from 'components/Modal/ModalFooter'
import { queryClient } from 'utils/queryClient'
import { additionalUsersQueryKey, useRemoveAdditionalUserMutation } from 'containers/account/queries'

export function RemoveAdditionalUserForm() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const { mutateAsync: removeAdditionalUser, isLoading: isDeleteCategoryLoading } = useRemoveAdditionalUserMutation()

    const email = searchParams.get('email') || ''

    return (
        <div>
            <UrlModal title='Remove Additional User' desc={email} onClose={() => navigate(-1)}>
                <>
                    <ModalBody>Are you sure you want to revoke access to your account for this email address?</ModalBody>
                    <ModalFooter
                        buttons={[
                            <Button key={1} color='secondary' onClick={() => navigate(-1)}>
                                Back
                            </Button>,
                            <Button
                                key={2}
                                color='error'
                                loading={isDeleteCategoryLoading}
                                disabled={isDeleteCategoryLoading}
                                onClick={() => {
                                    removeAdditionalUser(
                                        { additional_user_email: email },
                                        {
                                            onSuccess: (res) => {
                                                toast.success(res.message)
                                                queryClient.invalidateQueries(additionalUsersQueryKey())
                                                navigate(-1)
                                            }
                                        }
                                    )
                                }}
                            >
                                Remove Additional User
                            </Button>
                        ]}
                    />
                </>
            </UrlModal>
        </div>
    )
}
