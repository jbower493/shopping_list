import { baseUrl } from '../config'

const fetchWrapper = (url: string, options?: RequestInit) => {
    return fetch(`${baseUrl}${url}`, options)
        .then(async (response) => {
            if (response.ok) {
                const data = await response.json()
                return { data, status: response.status };
            }
            const error = await response.json()
            return Promise.reject({ error, status: response.status });
        })
        .catch((e) => {
            return Promise.reject({ error: e.error || 'Could not connect to server.', status: e.status || 500 });
        });
};

export default fetchWrapper;
