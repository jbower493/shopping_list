import classNames from 'classnames'
import React, { ReactNode } from 'react'

const FormRow: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={classNames('mb-3', className)}>{children}</div>
}

export default FormRow
