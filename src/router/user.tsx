import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from 'containers/dashboard/dashboard'
import Lists from 'containers/lists/lists'
import AddListForm from 'containers/lists/forms/addListForm'
import DeleteListForm from 'containers/lists/forms/deleteListForm'
import EditList from 'containers/lists/editList'
import Items from 'containers/items/items'
import AddItemForm from 'containers/items/forms/addItemForm'
import DeleteItemForm from 'containers/items/forms/deleteItemForm'

function UserRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/lists' element={<Lists />}>
                <Route path='new' element={<AddListForm />} />
                <Route path='delete/:listId' element={<DeleteListForm />} />
            </Route>
            <Route path='/lists/edit/:listId' element={<EditList />} />
            <Route path='/items' element={<Items />}>
                <Route path='new' element={<AddItemForm />} />
                <Route path='delete/:itemId' element={<DeleteItemForm />} />
            </Route>
            <Route path='/recipes' element={<div>Recipes</div>} />
            <Route path='*' element={<div className='h-full flex justify-center items-center'>No route</div>} />
        </Routes>
    )
}

export default UserRouter
