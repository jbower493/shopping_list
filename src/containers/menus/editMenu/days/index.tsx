import { useContext } from 'react'
import EditMenuRecipe from '../../components/editMenuRecipe'
import { useUpdateMenuRecipeMutation } from '../../queries'
import { MenuRecipe } from '../../types'
import { Droppable } from './droppable'
import { EditMenuIsDraggingContext } from '..'
import classnames from 'classnames'

const oneDay = 24 * 60 * 60 * 1000

function getNextSaturday() {
    // const today = new Date()

    // const dayOfWeek = today.getDay()

    // let daysUntilSaturday = 6 - dayOfWeek

    // if (dayOfWeek >= 6) {
    //     daysUntilSaturday += 7
    // }

    // const nextSaturday = new Date(today.getTime() + daysUntilSaturday * oneDay)

    // return nextSaturday

    // For now just always hardcode the week to a random week, because I'm only implementing the days of the week rather than full dates
    return new Date('2024-04-27')
}

function addDays(date: Date, daysToAdd: number) {
    return new Date(date.getTime() + daysToAdd * oneDay)
}

function formatDate(date: Date): string {
    // Format the date to "YYYY-MM-DD"
    const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    return formattedDate
}

export function getDayOptions() {
    const days = [
        {
            day: 'saturday',
            date: formatDate(getNextSaturday())
        },
        {
            day: 'sunday',
            date: formatDate(addDays(getNextSaturday(), 1))
        },
        {
            day: 'monday',
            date: formatDate(addDays(getNextSaturday(), 2))
        },
        {
            day: 'tuesday',
            date: formatDate(addDays(getNextSaturday(), 3))
        },
        {
            day: 'wednesday',
            date: formatDate(addDays(getNextSaturday(), 4))
        },
        {
            day: 'thursday',
            date: formatDate(addDays(getNextSaturday(), 5))
        },
        {
            day: 'friday',
            date: formatDate(addDays(getNextSaturday(), 6))
        }
    ]

    return days
}

export function Days({ recipes, menuId }: { recipes: MenuRecipe[]; menuId: number }) {
    const { isDragging, setIsDragging } = useContext(EditMenuIsDraggingContext)

    const { mutate: updateMenuRecipe } = useUpdateMenuRecipeMutation()

    const days = getDayOptions()

    return (
        <div>
            <ul>
                {days.map(({ day, date }) => {
                    const recipesOnThisDay = recipes.filter(({ day_of_week }) => day_of_week.day === date)

                    return (
                        <li key={day} className='w-full max-w-md mb-4'>
                            <Droppable
                                className={classnames('h-8 w-72 flex items-center rounded-lg pl-2', { 'bg-primary-50': isDragging })}
                                onDragOver={(e) => {
                                    e.dataTransfer.dropEffect = 'move'
                                }}
                                onDrop={(e) => {
                                    const data = e.dataTransfer.getData('application/my-app')
                                    const recipeId: number = JSON.parse(data)?.recipeId

                                    updateMenuRecipe({ menuId: menuId.toString(), recipeId: recipeId.toString(), attributes: { day: date } })

                                    setIsDragging(false)
                                }}
                            >
                                <h4 className='capitalize text-primary'>{day}</h4>
                            </Droppable>

                            {recipesOnThisDay.map((recipe) => {
                                return (
                                    <div key={recipe.id} className='pl-4'>
                                        <EditMenuRecipe key={recipe.id} recipe={recipe} menuId={menuId} />
                                    </div>
                                )
                            })}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
