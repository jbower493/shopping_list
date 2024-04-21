import { ReactNode } from 'react'

/**
 * A page that takes up all the remaining height on the page after the header
 */
export function FullScreenPage({ children }: { children: ReactNode }) {
    return <div className='inset-0 absolute pt-14'>{children}</div>
}
