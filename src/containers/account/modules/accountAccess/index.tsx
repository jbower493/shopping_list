import { useAccountAccessQuery, useLoginAsAnotherUserMutation } from '../../queries'
import { useNavigate } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'

export function AccountAccess() {
    const navigate = useNavigate()

    const { data: accountAccessData, isFetching: isAccountAccessFetching } = useAccountAccessQuery()

    const { mutate: loginAsAnotherUser } = useLoginAsAnotherUserMutation()

    function renderAccountAccess() {
        if (isAccountAccessFetching) {
            return <p className='mt-2'>Loading account access...</p>
        }

        if (!Array.isArray(accountAccessData) || accountAccessData.length <= 0) {
            return <p className='mt-2'>You currently don&apos;t have access to any other accounts</p>
        }

        return (
            <ul className='mt-2'>
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
        <div>
            <h2>Account Access</h2>
            {renderAccountAccess()}
        </div>
    )
}
