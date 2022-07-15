import React, { useEffect } from 'react'
import { useGetListsQuery } from './api'
import axios from 'axios'

axios.defaults.withCredentials = true

function Lists() {
    // useGetListsQuery()

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/get-csrf')
            .then(() => {
                return axios.get('http://localhost:8000/api/logged-in-mate')
                // axios({
                //     url: 'http://localhost:8000/api/login',
                //     method: 'post',
                //     data: {
                //         "email": "j_bower@hotmail.co.uk",
                //         "password": "password"
                //     }
                // })
                // axios({
                //     url: 'http://localhost:8000/api/register',
                //     method: 'post',
                //     data: {
                //         "name": "Jamie",
                //         "email": "j_bower@hotmail.co.uk",
                //         "password": "password"
                //     }
                // })
            })
            .catch(() => {
                return 4
            })
    }, [])
    return <div></div>
}

export default Lists
