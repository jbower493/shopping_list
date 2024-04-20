import { ReactNode } from 'react'

import './fullScreenPage.css'

/**
 * A page that takes up all the remaining height on the page after the header
 */
export function FullScreenPage({ children }: { children: ReactNode }) {
    return <div className='FullScreenPage'>{children}</div>
}
