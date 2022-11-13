import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// import Items from 'containers/items/items'
// import AddItemForm from 'containers/items/forms/addItemForm'
// import DeleteItemForm from 'containers/items/forms/deleteItemForm'

import Lists from 'containers/lists/lists'
import AddListForm from 'containers/lists/forms/addListForm'
import DeleteListForm from 'containers/lists/forms/deleteListForm'
import EditList from 'containers/lists/editList'

import Recipes from 'containers/recipes/recipes'
import AddRecipeForm from 'containers/recipes/forms/addRecipeForm'
import DeleteRecipeForm from 'containers/recipes/forms/deleteRecipeForm'
import EditRecipe from 'containers/recipes/editRecipe'

import Shop from 'containers/shop/shop'
import ChooseList from 'containers/shop/chooseList'

function UserRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Navigate to='/lists' replace />} />
            {/* <Route path='/items' element={<Items />}>
                <Route path='new' element={<AddItemForm />} />
                <Route path='delete/:itemId' element={<DeleteItemForm />} />
            </Route> */}
            <Route path='/lists' element={<Lists />}>
                <Route path='new' element={<AddListForm />} />
                <Route path='delete/:listId' element={<DeleteListForm />} />
            </Route>
            <Route path='/lists/edit/:listId' element={<EditList />} />
            <Route path='/recipes' element={<Recipes />}>
                <Route path='new' element={<AddRecipeForm />} />
                <Route path='delete/:recipeId' element={<DeleteRecipeForm />} />
            </Route>
            <Route path='/recipes/edit/:recipeId' element={<EditRecipe />} />
            <Route path='/shop' element={<ChooseList />} />
            <Route path='/shop/:listId' element={<Shop />} />
            <Route path='*' element={<div className='h-full flex justify-center items-center'>No route</div>} />
        </Routes>
    )
}

export default UserRouter
