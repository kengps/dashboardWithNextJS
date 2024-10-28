
import { logged } from '@/app/api/auth/login/login';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'



const persistMiddleware = create(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: '',
            token: '',
            expirationTime: null,
            Login: async (value) => {
                const response = await logged(value);
                const token = response.data.token; // Assuming your API returns a token
                const expiresIn = 2 * 60 * 60 * 1000; // 1 hour in milliseconds
                const expirationTime = Date.now() + expiresIn;

                set({
                    user: response.data,
                    isAuthenticated: true,
                    token: token,
                    expirationTime: expirationTime
                });

                // Set timeout to automatically logout after token expires
                setTimeout(() => {
                    get().Logout();
                }, expiresIn);

                console.log('Save data in persist success');
                return response.data;
            },
            Logout: () => {
                set({ user: '', isAuthenticated: false, token: '', expirationTime: null });
                localStorage.clear();
            },
            checkTokenExpiration: () => {
                const expirationTime = get().expirationTime;
                if (expirationTime && Date.now() > expirationTime) {
                    get().Logout(); // Auto logout if token has expired
                }
            }
        }),
        {
            name: 'auth-storage', 
            getStorage: () => localStorage // Use localStorage
        }
    ),
);

export default persistMiddleware;
