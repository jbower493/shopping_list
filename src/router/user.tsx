import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Items from 'containers/items/items'
import AddItemForm from 'containers/items/forms/addItemForm'
import DeleteItemForm from 'containers/items/forms/deleteItemForm'

import Categories from 'containers/categories/categories'
import AddCategoryForm from 'containers/categories/forms/addCategoryForm'
import DeleteCategoryForm from 'containers/categories/forms/deleteCategoryForm'

import Lists from 'containers/lists/lists'
import AddListForm from 'containers/lists/forms/addListForm'
import DeleteListForm from 'containers/lists/forms/deleteListForm'
import EditList from 'containers/lists/editList'
import AddFromRecipeForm from 'containers/lists/forms/addFromRecipeForm'
import AddFromMenuForm from 'containers/lists/forms/addFromMenuForm'

import Recipes from 'containers/recipes/recipes'
import AddRecipeForm from 'containers/recipes/forms/addRecipeForm'
import DeleteRecipeForm from 'containers/recipes/forms/deleteRecipeForm'
import EditRecipe from 'containers/recipes/editRecipe'

import Menus from 'containers/menus/menus'
import AddMenuForm from 'containers/menus/forms/addMenuForm'
import DeleteMenuForm from 'containers/menus/forms/deleteMenuForm'
import EditMenu from 'containers/menus/editMenu'

import Shop from 'containers/shop/shop'
import ChooseList from 'containers/shop/chooseList'

function UserRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Navigate to='/lists' replace />} />
            <Route path='/items' element={<Items />}>
                <Route path='new' element={<AddItemForm />} />
                <Route path='delete/:itemId' element={<DeleteItemForm />} />
            </Route>
            <Route path='/categories' element={<Categories />}>
                <Route path='new' element={<AddCategoryForm />} />
                <Route path='delete/:categoryId' element={<DeleteCategoryForm />} />
            </Route>
            <Route path='/lists' element={<Lists />}>
                <Route path='new' element={<AddListForm />} />
                <Route path='delete/:listId' element={<DeleteListForm />} />
            </Route>
            <Route path='/lists/edit/:listId' element={<EditList />}>
                <Route path='add-from-recipe' element={<AddFromRecipeForm />} />
                <Route path='add-from-menu' element={<AddFromMenuForm />} />
            </Route>
            <Route path='/recipes' element={<Recipes />}>
                <Route path='new' element={<AddRecipeForm />} />
                <Route path='delete/:recipeId' element={<DeleteRecipeForm />} />
            </Route>
            <Route path='/recipes/edit/:recipeId' element={<EditRecipe />} />
            <Route path='/menus' element={<Menus />}>
                <Route path='new' element={<AddMenuForm />} />
                <Route path='delete/:menuId' element={<DeleteMenuForm />} />
            </Route>
            <Route path='/menus/edit/:menuId' element={<EditMenu />} />
            <Route path='/shop' element={<ChooseList />} />
            <Route path='/shop/:listId' element={<Shop />} />
            <Route path='*' element={<div className='h-full flex justify-center items-center'>No route</div>} />
        </Routes>
    )
}

export default UserRouter
