import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UrlModal from 'components/Modal/UrlModal'
import Button from 'components/Button'
import { useCreateListMutation } from 'utils/api/lists'
import InputField from 'components/Form/Inputs/InputField'

type Inputs = {
    name: string
}

function AddListForm() {
    const navigate = useNavigate()

    const [createList, { isLoading }] = useCreateListMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = ({ name }) => {
        createList({ name })
            .then(() => {
                navigate(-1)
            })
            .catch(() => {
                navigate(-1)
            })
    }

    return (
        <div>
            <UrlModal title='New List' description='Enter a name for your new list.' onClose={() => navigate(-1)}>
                <form className='w-96' onSubmit={handleSubmit(onSubmit)}>
                    <InputField<Inputs>
                        label='Name'
                        name='name'
                        type='text'
                        register={register}
                        validation={{ required: 'This is required.' }}
                        error={errors.name}
                    />
                    <div>
                        <Button className='w-full' type='submit' loading={isLoading} disabled={isLoading}>
                            Create
                        </Button>
                    </div>
                </form>
            </UrlModal>
        </div>
    )
}

export default AddListForm
