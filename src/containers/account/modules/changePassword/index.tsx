import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'

export function ChangePassword() {
    const navigate = useNavigate()

    return (
        <div>
            <h2>Change Password</h2>
            <div className='mt-4'>
                <Button onClick={() => navigate('/account/change-password')}>Change Password</Button>
            </div>
        </div>
    )
}
