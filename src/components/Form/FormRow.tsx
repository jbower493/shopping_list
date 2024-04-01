import React, { ReactNode } from 'react'

const FormRow: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className='mb-3'>{children}</div>
}

export default FormRow
