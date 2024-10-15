import { useParams, Link, useNavigate, Outlet } from 'react-router-dom'
import { useGetSingleMenuQuery, useUpdateMenuRecipeMutation } from '../queries'
import { useGetRecipesQuery } from 'containers/recipes/queries'
import Loader from 'components/Loader'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import EditMenuRecipe from 'containers/menus/components/editMenuRecipe'
import Button from 'components/Button'
import { Days, getDayOptions } from './days'
import { Droppable } from './days/droppable'
import { createContext, useContext, useState } from 'react'
import classnames from 'classnames'

export const EditMenuIsDraggingContext = createContext({
    isDragging: false,
    // eslint-disable-next-line
    setIsDragging: (value: boolean) => {
        /** */
    }
})

function EditMenuIsDraggingContextProvider({ children }: { children: React.ReactNode }) {
    const [isDragging, setIsDragging] = useState(false)

    return <EditMenuIsDraggingContext.Provider value={{ isDragging, setIsDragging }}>{children}</EditMenuIsDraggingContext.Provider>
}

function EditMenu() {
    const { menuId } = useParams()
    const navigate = useNavigate()

    const { isDragging, setIsDragging } = useContext(EditMenuIsDraggingContext)

    const { data: getSingleMenuData, isLoading: isGetSingleMenuLoading, isError: isGetSingleMenuError } = useGetSingleMenuQuery(menuId || '')
    const { data: getRecipesData, isFetching: isGetRecipesFetching, isError: isGetRecipesError } = useGetRecipesQuery()
    const { mutate: updateMenuRecipe } = useUpdateMenuRecipeMutation()

    if (isGetSingleMenuLoading || isGetRecipesFetching) return <Loader fullPage />
    if (isGetSingleMenuError || !getSingleMenuData || isGetRecipesError || !getRecipesData) return <h1>Menu error</h1>

    const { name, id, recipes } = getSingleMenuData

    const renderRecipesWithNoDay = () => {
        return (
            <div>
                <Droppable
                    className={classnames('h-[32px] w-72 flex items-center rounded-lg pl-2', {
                        'bg-primary-50 border-primary border-2 border-dashed ml-[-2px]': isDragging
                    })}
                    onDragOver={(e) => {
                        e.preventDefault()

                        e.dataTransfer.dropEffect = 'move'
                    }}
                    onDrop={(e) => {
                        e.preventDefault()

                        const data = e.dataTransfer.getData('application/my-app')
                        const recipeId: number = JSON.parse(data)?.recipeId

                        updateMenuRecipe({ menuId: menuId?.toString() || '', recipeId: recipeId.toString(), attributes: { day: null } })

                        setIsDragging(false)
                    }}
                >
                    <h4>No Day Assigned</h4>
                </Droppable>
                <ul className='mt-2 pl-4'>
                    {[...recipes]
                        .filter(
                            ({ day_of_week }) =>
                                !getDayOptions()
                                    .map((dayOption) => dayOption.date)
                                    .includes(day_of_week.day || '')
                        )
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((recipe) => (
                            <EditMenuRecipe key={recipe.id} recipe={recipe} menuId={id} />
                        ))}
                </ul>
            </div>
        )
    }

    return (
        <div className='p-4'>
            <Link to='/menus'>Back to menus</Link>
            <div className='flex items-center mb-7 mt-2'>
                <h2>{name}</h2>
                <button className='ml-4' type='button' onClick={() => navigate(`/menus/edit/${id}/details`)}>
                    <PencilSquareIcon className='w-5 text-primary hover:text-primary-hover' />
                </button>
            </div>
            <Button className='mb-4' onClick={() => navigate(`/menus/edit/${menuId}/add-recipe`)}>
                Add Recipe
            </Button>
            <p className='mb-4'>Drag and drop recipes to change the day</p>
            {renderRecipesWithNoDay()}
            <Days recipes={recipes} menuId={Number(menuId)} />
            <Outlet />
        </div>
    )
}

function EditMenuWithContext() {
    return (
        <EditMenuIsDraggingContextProvider>
            <EditMenu />
        </EditMenuIsDraggingContextProvider>
    )
}

export default EditMenuWithContext
