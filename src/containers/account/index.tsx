import { Outlet } from 'react-router-dom'
import { AdditionalUsers } from './modules/additionalUsers'
import { AccountAccess } from './modules/accountAccess'
import { ChangeEmail } from './modules/changeEmail'
import { ChangePassword } from './modules/changePassword'
import { DeleteAccount } from './modules/deleteAccount'

export function Account() {
    return (
        <div className='p-4'>
            <div className='flex flex-col gap-8'>
                <ChangeEmail />
                <ChangePassword />
                <AdditionalUsers />
                <AccountAccess />
                <DeleteAccount />
            </div>

            <Outlet />
        </div>
    )
}
