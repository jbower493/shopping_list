import { useAccountAccessQuery, useAdditionalUsersQuery } from './queries'

export function Account() {
    const { data: additionalUsersData } = useAdditionalUsersQuery()
    const { data: accountAccessData } = useAccountAccessQuery()

    return (
        <div>
            <h2>Additional Users</h2>
            <ul>
                {(additionalUsersData || []).map((item) => (
                    <li key={item.email}>{item.email}</li>
                ))}
            </ul>
            <h2>Account Access</h2>
            <ul>
                {(accountAccessData || []).map((item) => (
                    <li key={item.email}>{item.email}</li>
                ))}
            </ul>
        </div>
    )
}
