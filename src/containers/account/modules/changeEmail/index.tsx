import Button from 'components/Button'
import { useGetUserQuery } from 'containers/auth/queries'
import { useNavigate } from 'react-router-dom'

export function ChangeEmail() {
    const navigate = useNavigate()

    const { data: getUserData } = useGetUserQuery()

    return (
        <div>
            <h2>Account Email Address</h2>
            <p className='mt-2'>
                <span className=''>Current email: </span>
                <span className='text-primary'>{getUserData?.user.email}</span>
            </p>
            <div className='mt-4'>
                <Button onClick={() => navigate('/account/change-email')}>Change Email</Button>
            </div>
        </div>
    )
}
