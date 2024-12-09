import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'

export function DeleteAccount() {
    const navigate = useNavigate()

    return (
        <div>
            <h2>Delete Account</h2>
            <p className='mt-4'>
                After clicking the &quot;Delete Account&quot; button, you will be asked to type in your email address in order to confirm account
                deletion.
            </p>
            <div className='mt-4'>
                <Button onClick={() => navigate('/account/delete')}>Delete Account</Button>
            </div>
        </div>
    )
}
