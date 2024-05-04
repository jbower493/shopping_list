import Button from 'components/Button'
import { useAccountAccessQuery, useAdditionalUsersQuery, useLoginAsAnotherUserMutation } from './queries'
import { Outlet, useNavigate } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'

export function Account() {
    const navigate = useNavigate()

    const { data: additionalUsersData, isFetching: isAdditionalUsersFetching } = useAdditionalUsersQuery()
    const { data: accountAccessData, isFetching: isAccountAccessFetching } = useAccountAccessQuery()

    const { mutate: loginAsAnotherUser } = useLoginAsAnotherUserMutation()

    function renderAdditionalUsers() {
        if (isAdditionalUsersFetching) {
            return <p className='mt-4'>Loading additional users...</p>
        }

        if (!Array.isArray(additionalUsersData) || additionalUsersData.length <= 0) {
            return <p className='mt-4'>You currently have no additional users with access to your account</p>
        }

        return (
            <ul className='mt-4'>
                {(additionalUsersData || []).map((item) => (
                    <li key={item.email}>{item.email}</li>
                ))}
            </ul>
        )
    }

    function renderAccountAccess() {
        if (isAccountAccessFetching) {
            return <p className='mt-4'>Loading account access...</p>
        }

        if (!Array.isArray(accountAccessData) || accountAccessData.length <= 0) {
            return <p className='mt-4'>You currently don&apos;t have access to any other accounts</p>
        }

        return (
            <ul className='mt-4'>
                {(accountAccessData || []).map((item) => (
                    <li className='flex justify-between w-full max-w-md mb-2' key={item.email}>
                        <p>{item.email}</p>
                        <button
                            type='button'
                            onClick={() => loginAsAnotherUser({ user_email_to_login_as: item.email }, { onSuccess: () => navigate('/lists') })}
                        >
                            <ArrowRightOnRectangleIcon className='w-6 text-primary hover:text-primary-hover' />
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='p-4'>
            <div>
                <h2>Additional Users</h2>
                <div className='mt-4'>
                    <Button onClick={() => navigate('/account/additional-user/add')}>Add New</Button>
                </div>
                {renderAdditionalUsers()}
            </div>

            <div className='mt-8'>
                <h2>Account Access</h2>
                {renderAccountAccess()}
            </div>

            <Outlet />
        </div>
    )
}
