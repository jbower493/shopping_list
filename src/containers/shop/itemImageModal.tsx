import UrlModal from 'components/Modal/UrlModal'
import { useGetSingleListQuery } from 'containers/lists/queries'
import { useNavigate, useParams } from 'react-router-dom'

export function ItemImageModal() {
    const navigate = useNavigate()

    const { listId, itemId } = useParams()

    const { data: getSingleListData } = useGetSingleListQuery(listId || '')
    const item = getSingleListData?.items.find((item) => item.id === Number(itemId))

    if (!item) {
        return null
    }

    return (
        <UrlModal onClose={() => navigate(`/shop/${listId}`)} title={item.name}>
            <div className='p-4'>
                <div className='relative h-80 w-full max-w-[480px]'>
                    <img className='h-full w-full object-cover rounded-md' src={item.image_url || ''} alt={item.name} />
                </div>
            </div>
        </UrlModal>
    )
}
