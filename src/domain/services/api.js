import axios from "axios";

// src/app/api/getUsers.js (or any suitable path)
export const getUser = async () => {
    const res = await fetch('https://670e3a38073307b4ee45facf.mockapi.io/users');
    if (!res.ok) {
        throw new Error('fetch user error!');
    }
    return res.json();
};

export const getUserById = async () => {
    const res = await fetch('https://670e3a38073307b4ee45facf.mockapi.io/users')

    if (!res.ok) {
        throw new Error('fetch user error!');
    }
    return res.json()
}

export const loggedIn = async (value) => {
    return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/login`, value)
}
