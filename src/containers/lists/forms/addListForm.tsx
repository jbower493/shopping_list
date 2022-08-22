import React, { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useCreateListMutation } from 'utils/api/lists'

function AddListForm() {
    const [name, setName] = useState('')

    const navigate = useNavigate()

    const [createList, { isLoading }] = useCreateListMutation()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        createList({ name })
    }

    useEffect(() => {
        if (isLoading) navigate(-1)
    }, [isLoading])

    return (
        <div>
            <UrlModal title='New List' description='Enter a name for your new list.' onClose={() => navigate(-1)}>
                <form className='max-w-xs w-full' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <Button className='w-full' type='submit' loading={isLoading}>
                            Create
                        </Button>
                    </div>
                </form>
            </UrlModal>
        </div>
    )
}

export default AddListForm
