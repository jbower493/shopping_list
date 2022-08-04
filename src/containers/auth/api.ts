import fetch from '../../utils/fetch'

export const authApi = {
    getUser: () => fetch('/user')
}
