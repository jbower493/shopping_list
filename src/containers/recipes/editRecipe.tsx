import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetSingleRecipeQuery, useAddItemToRecipeMutation } from 'utils/api/recipes'
import { useGetItemsQuery } from 'utils/api/items'
import Loader from 'components/Loader'
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import EditRecipeItem from 'containers/recipes/components/editRecipeItem'
import ComboBox from 'components/Form/Inputs/Combobox'

function EditRecipe() {
    const [itemToAdd, setItemToAdd] = useState<string>('')
    const [anyChanges, setAnyChanges] = useState<boolean>(false)

    const { recipeId } = useParams()

    const { data: recipeData, isFetching: isGetRecipeFetching, isError: isGetRecipeError } = useGetSingleRecipeQuery(recipeId || '')
    const { data: itemsData, isFetching: isGetItemsFetching, isError: isGetItemsError } = useGetItemsQuery()

    const [addItemToRecipe, { isLoading: isAddItemLoading }] = useAddItemToRecipeMutation()

    if (isGetRecipeFetching || isGetItemsFetching) return <Loader fullPage />
    if (isGetRecipeError || !recipeData || isGetItemsError || !itemsData) return <h1>Recipe error</h1>

    const { name, id, items } = recipeData

    const renderCurrentItems = () => {
        return (
            <>
                <h3 className='mb-2'>Items</h3>
                <ul>
                    {items.map((item, index) => (
                        <EditRecipeItem key={index} item={item} recipeId={id} setAnyChanges={setAnyChanges} />
                    ))}
                </ul>
            </>
        )
    }

    return (
        <div className='p-4'>
            <Link to='/recipes'>Back to recipes</Link>
            <div className='flex justify-between mb-7 mt-2'>
                <h2>Edit Recipe</h2>
                <div className='flex items-center'>
                    {anyChanges ? (
                        <small className='opacity-40 flex items-center text-sm mr-2'>
                            <CheckIcon className='w-4 h-4 mr-1' />
                            Saved
                        </small>
                    ) : (
                        ''
                    )}
                    <ClipboardDocumentListIcon className='mr-2 w-7 text-primary' />
                    <p>{name}</p>
                </div>
            </div>
            <p>Add Item</p>
            <div className='flex items-center mb-7'>
                <ComboBox value={itemToAdd} setValue={setItemToAdd} options={itemsData.map(({ name }) => name)} />
                {isAddItemLoading ? (
                    <Loader size={'small'} />
                ) : (
                    <button
                        onClick={() => {
                            addItemToRecipe({ recipeId: id.toString(), itemName: itemToAdd })
                                .unwrap()
                                .then(() => {
                                    setAnyChanges(true)
                                    setItemToAdd('')
                                })
                        }}
                    >
                        <PlusIcon className='w-8 text-primary hover:text-primary-hover' />
                    </button>
                )}
            </div>
            {renderCurrentItems()}
        </div>
    )
}

export default EditRecipe
