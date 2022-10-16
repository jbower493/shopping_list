import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ListBulletIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useGetSingleListQuery } from 'utils/api/lists'
import Loader from 'components/Loader'

function Shop() {
    const [checked, setChecked] = useState<string[]>([])

    const { listId } = useParams()

    const { data, isFetching, isError } = useGetSingleListQuery(listId || '')

    const checkItem = (name: string) => setChecked([...checked, name])
    const uncheckItem = (name: string) => setChecked((prevChecked) => prevChecked.filter((item) => item !== name))

    if (isFetching) return <Loader fullPage />
    if (isError || !data) return <h1>List error</h1>

    const { name, items } = data

    return (
        <div className='p-4'>
            <div className='flex justify-between mb-8'>
                <h2>Shop</h2>
                <div className='flex items-center'>
                    <ListBulletIcon className='mr-2 w-7 text-primary' />
                    <p>{name}</p>
                </div>
            </div>
            {items.map(({ name }, index) => {
                const isChecked = checked.includes(name)

                return (
                    <button
                        key={index}
                        onClick={() => {
                            if (isChecked) uncheckItem(name)
                            else checkItem(name)
                        }}
                        className='flex justify-between w-full max-w-md mb-2'
                    >
                        <p className={`${isChecked ? 'line-through' : ''}`}>{name}</p>
                        {isChecked ? (
                            <CheckCircleIcon className='w-6 text-primary' />
                        ) : (
                            <div className='w-5 h-5 rounded-full border border-primary hover:border-primary-hover' />
                        )}
                    </button>
                )
            })}
        </div>
    )
}

export default Shop
