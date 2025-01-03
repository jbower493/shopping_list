import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'

import Items from 'containers/items/items'
import AddItemForm from 'containers/items/forms/addItemForm'
import DeleteItemForm from 'containers/items/forms/deleteItemForm'

import Categories from 'containers/categories/categories'
import AddCategoryForm from 'containers/categories/forms/addCategoryForm'
import DeleteCategoryForm from 'containers/categories/forms/deleteCategoryForm'

import RecipeCategories from 'containers/recipeCategories/recipeCategories'
import AddRecipeCategoryForm from 'containers/recipeCategories/forms/addRecipeCategoryForm'
import DeleteRecipeCategoryForm from 'containers/recipeCategories/forms/deleteRecipeCategoryForm'

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
import EditRecipeDetailsForm from 'containers/recipes/forms/editRecipeDetailsForm'
import DuplicateRecipeForm from 'containers/recipes/forms/duplicateRecipeForm'
import AddRecipeToMenuForm from 'containers/menus/forms/addRecipeToMenuForm'
import EditListDetailsForm from 'containers/lists/forms/editListDetailsForm'
import EditCategoryDetailsForm from 'containers/categories/forms/editCategoryDetailsForm'
import EditRecipeCategoryDetailsForm from 'containers/recipeCategories/forms/editRecipeCategoryDetailsForm'
import EditMenuDetailsForm from 'containers/menus/forms/editMenuDetailsForm'
import EditItemDetailsForm from 'containers/items/forms/editItemDetailsForm'
import { FullScreenPage } from 'components/FullScreenPage'
import { UpdateListItemForm } from 'containers/lists/forms/updateListItemForm'
import { UpdateRecipeItemQuantityForm } from 'containers/recipes/forms/updateRecipeItemQuantityForm'
import { Account } from 'containers/account'
import { AddAdditionalUserForm } from 'containers/account/modules/additionalUsers/forms/addAdditionalUserForm'
import { ChangeEmailForm } from 'containers/account/modules/changeEmail/forms/changeEmailForm'
import { ChangePasswordForm } from 'containers/account/modules/changePassword/forms/changePasswordForm'
import { RemoveAdditionalUserForm } from 'containers/account/modules/additionalUsers/forms/removeAdditionalUserForm'
import { DeleteAccountForm } from 'containers/account/modules/deleteAccount/forms/deleteAccountForm'
import CreateShareRecipeRequestForm from 'containers/recipes/forms/createShareRecipeRequestForm'
import AcceptSharedRecipeForm from 'containers/recipes/forms/acceptSharedRecipeForm'
import { usePrefetchAppCriticalData } from 'utils/hooks'
import { UploadRecipeImageForm } from 'containers/recipes/forms/uploadRecipeImageForm'
import { RemoveRecipeImageForm } from 'containers/recipes/forms/removeRecipeImageForm'
import { ItemImageModal } from 'containers/shop/itemImageModal'
import { RandomRecipesForm } from 'containers/menus/forms/randomRecipesForm'
import { ConfirmImportedRecipeForm } from 'containers/recipes/forms/confirmImportedRecipeForm'

function RedirectToRefAfterLogin() {
    const [searchParams] = useSearchParams()
    const ref = searchParams.get('ref')

    if (ref) {
        return <Navigate to={ref} replace />
    }

    return <Navigate to='/lists' replace />
}

function UserRouter() {
    usePrefetchAppCriticalData()

    return (
        <Routes>
            <Route path='/login' element={<RedirectToRefAfterLogin />} />
            <Route path='/register' element={<RedirectToRefAfterLogin />} />
            <Route path='/' element={<Navigate to='/lists' replace />} />
            <Route path='/items' element={<Items />}>
                <Route path='new' element={<AddItemForm />} />
                <Route path='delete/:itemId' element={<DeleteItemForm />} />
                <Route path='edit/:itemId' element={<EditItemDetailsForm />} />
            </Route>
            <Route path='/categories' element={<Categories />}>
                <Route path='new' element={<AddCategoryForm />} />
                <Route path='delete/:categoryId' element={<DeleteCategoryForm />} />
                <Route path='edit/:categoryId' element={<EditCategoryDetailsForm />} />
            </Route>
            <Route path='/recipe-categories' element={<RecipeCategories />}>
                <Route path='new' element={<AddRecipeCategoryForm />} />
                <Route path='delete/:recipeCategoryId' element={<DeleteRecipeCategoryForm />} />
                <Route path='edit/:recipeCategoryId' element={<EditRecipeCategoryDetailsForm />} />
            </Route>
            <Route path='/lists' element={<Lists />}>
                <Route path='new' element={<AddListForm />} />
                <Route path='delete/:listId' element={<DeleteListForm />} />
            </Route>
            <Route path='/lists/edit/:listId' element={<EditList />}>
                <Route path='details' element={<EditListDetailsForm />} />
                <Route path='add-from-recipe' element={<AddFromRecipeForm />} />
                <Route path='add-from-menu' element={<AddFromMenuForm />} />
                <Route path='update-item-quantity/:itemId' element={<UpdateListItemForm />} />
            </Route>
            <Route path='/recipes' element={<Recipes />}>
                <Route path='new' element={<AddRecipeForm />} />
                <Route path='delete/:recipeId' element={<DeleteRecipeForm />} />
                <Route path='accept-shared/:shareRequestId' element={<AcceptSharedRecipeForm />} />
                <Route path='confirm-import/:importedRecipeId' element={<ConfirmImportedRecipeForm />} />
            </Route>
            <Route path='/recipes/edit/:recipeId' element={<EditRecipe />}>
                <Route path='details' element={<EditRecipeDetailsForm />} />
                <Route path='duplicate' element={<DuplicateRecipeForm />} />
                <Route path='share' element={<CreateShareRecipeRequestForm />} />
                <Route path='upload-image' element={<UploadRecipeImageForm />} />
                <Route path='remove-image' element={<RemoveRecipeImageForm />} />
                <Route path='update-item-quantity/:itemId' element={<UpdateRecipeItemQuantityForm />} />
            </Route>
            <Route path='/menus' element={<Menus />}>
                <Route path='new' element={<AddMenuForm />} />
                <Route path='delete/:menuId' element={<DeleteMenuForm />} />
            </Route>
            <Route path='/menus/edit/:menuId' element={<EditMenu />}>
                <Route path='add-recipe' element={<AddRecipeToMenuForm />} />
                <Route path='details' element={<EditMenuDetailsForm />} />
                <Route path='random-recipes' element={<RandomRecipesForm />} />
            </Route>
            <Route path='/shop/:listId' element={<Shop />}>
                <Route path='item/:itemId/view-image' element={<ItemImageModal />} />
            </Route>
            <Route path='/account' element={<Account />}>
                <Route path='additional-user/add' element={<AddAdditionalUserForm />} />
                <Route path='additional-user/remove' element={<RemoveAdditionalUserForm />} />
                <Route path='change-email' element={<ChangeEmailForm />} />
                <Route path='change-password' element={<ChangePasswordForm />} />
                <Route path='delete' element={<DeleteAccountForm />} />
            </Route>
            <Route
                path='*'
                element={
                    <FullScreenPage>
                        <div className='h-full flex justify-center items-center'>No route</div>
                    </FullScreenPage>
                }
            />
        </Routes>
    )
}

export default UserRouter
