import axios from 'axios'

export const logged = async (value) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_APP_API}/api/auth/login`, value)
}



export const currentUser = async (authtoken) => {
    return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/current-user`, {},
        {
            headers: {
                authtoken,
            },
        }
    )
}


export const currentAdmin = async (authtoken) => {
    return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/current-admin `, {},
        {
            headers: {
                authtoken,
            },
        }
    )
}
