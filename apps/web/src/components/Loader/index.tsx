import { FullScreenPage } from 'components/FullScreenPage'

interface LoaderProps {
    size?: 'small'
    fullPage?: true
    color?: 'primary' | 'disabled'
}

function Loader({ size, fullPage, color }: LoaderProps) {
    const getSize = () => {
        if (size) return 'w-4 h-4 border-2'
        return 'w-14 h-14 border-4'
    }

    const getColor = () => {
        if (color === 'disabled') return 'border-gray-400 gray-t-primary-300 border-r-gray-300'
        return 'border-primary border-t-primary-100 border-r-primary-100'
    }

    const renderLoader = () => <div className={`${getSize()} rounded-full ${getColor()} animate-spin`} />

    if (fullPage)
        return (
            <FullScreenPage>
                <div className='w-full h-full flex justify-center items-center'>{renderLoader()}</div>
            </FullScreenPage>
        )

    return renderLoader()
}

export default Loader
