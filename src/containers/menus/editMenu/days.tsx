import { Recipe } from 'containers/recipes/types'
import EditMenuRecipe from '../components/editMenuRecipe'

const oneDay = 24 * 60 * 60 * 1000

function getNextSaturday() {
    const today = new Date()

    const dayOfWeek = today.getDay()

    let daysUntilSaturday = 6 - dayOfWeek

    if (dayOfWeek >= 6) {
        daysUntilSaturday += 7
    }

    const nextSaturday = new Date(today.getTime() + daysUntilSaturday * oneDay)

    return nextSaturday
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

export function Days({ recipes, menuId }: { recipes: Recipe[]; menuId: number }) {
    const days = getDayOptions()

    return (
        <div>
            <ul>
                {days.map(({ day, date }) => {
                    const recipesOnThisDay = recipes.filter(({ day_of_week }) => day_of_week.day === date)

                    return (
                        <li key={day} className='w-full max-w-md mb-4'>
                            <h4 className='capitalize text-primary'>{day}</h4>
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
