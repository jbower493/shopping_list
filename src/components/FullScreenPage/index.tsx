import { ReactNode } from 'react'

/**
 * A page that takes up all the remaining height on the page after the header
 */
export function FullScreenPage({ children }: { children: ReactNode }) {
    return <div className='pt-14 h-dvh w-full absolute top-0 left-0'>{children}</div>
}
