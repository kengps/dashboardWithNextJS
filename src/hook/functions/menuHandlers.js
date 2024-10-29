
// src/utils/menuHandlers.js
import { signOut } from 'next-auth/react';

import sweetalert from 'sweetalert2';

export const handleSideMenuClick = async (e, menuItems, router) => {


    try {
        const key = e.key;
        if (key === 'logout') {
            const confirm = await sweetalert.fire({
                title: 'ต้องการออกจากระบบ',
                showCloseButton: true,
                showCancelButton: true,
                icon: "question"
            });
            if (confirm.isConfirmed) {
                // Logout logic here
                signOut({ callbackUrl: '/auth/login' })
                localStorage.clear();
                // await fetch(`${process.env.NEXTAUTH_URL}api/auth/logout`)
            }
        }

        const findPath = (items) => {
            for (const item of items) {
                if (item.key === key) {
                    return item.path;
                }
                if (item.children) {
                    const foundPath = findPath(item.children);
                    if (foundPath) return foundPath;
                }
            }
            return null;
        };

        const path = findPath(menuItems);
        if (path) {
            console.log(`Navigating to: ${path}`);
            router.push(path);
        }
    } catch (error) {
        console.error('Error handling menu click:', error);
    }
};
