import Button from 'components/Button'
import { useAdditionalUsersQuery } from '../../queries'
import { useNavigate } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/24/solid'

export function AdditionalUsers() {
    const navigate = useNavigate()

    const { data: additionalUsersData, isFetching: isAdditionalUsersFetching } = useAdditionalUsersQuery()

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
                    <li key={item.email} className='flex justify-between w-full max-w-md mb-2'>
                        <p>{item.email}</p>
                        <button type='button' onClick={() => navigate(`/account/additional-user/remove?email=${encodeURIComponent(item.email)}`)}>
                            <XCircleIcon className='w-5 text-primary hover:text-primary-hover' />
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div>
            <h2>Additional Users</h2>
            <div className='mt-4'>
                <Button onClick={() => navigate('/account/additional-user/add')}>Add New</Button>
            </div>
            {renderAdditionalUsers()}
        </div>
    )
}
