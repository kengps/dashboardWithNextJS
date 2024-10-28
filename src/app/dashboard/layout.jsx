'use client'

import { Col, Layout, Row } from "antd";
import AppContent from "../../components/layout/content";
import AppFooter from "../../components/layout/footer";
import AppHeader from "../../components/layout/header";
import AppSidebar from "../../components/layout/sidebar";
import { Box } from "@mui/material";
import menuItems from '../../components/layout/menuItem/menuItem';
import { theme } from 'antd';

import react, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import sweetalert from 'sweetalert2'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { handleSideMenuClick } from "@/hook/functions/menuHandlers";

export default function DashboardLayout({ children }) {
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState([]); // Initial open key for submenu


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // const handleMenuClick = async (e) => {
    //     console.log('sdfsdfsdf');

    //     try {
    //         // หาเมนูที่ถูกคลิก
    //         const key = e.key;
    //         if (key === 'logout') {
    //             const confirm = await sweetalert.fire({
    //                 title: 'ต้องการออกจากระบบ',
    //                 showCloseButton: true,
    //                 showCancelButton: true,
    //                 icon: "question"
    //             });
    //             if (confirm.isConfirmed) {
    //                 // Logout();

    //             }

    //         }
    //         // ฟังก์ชันค้นหาเส้นทางจาก menuItems
    //         const findPath = (items) => {
    //             for (const item of items) {
    //                 if (item.key === key) {
    //                     return item.path; // คืนค่าเส้นทางหากเจอ
    //                 }
    //                 if (item.children) {
    //                     const foundPath = findPath(item.children);
    //                     if (foundPath) return foundPath; // คืนค่าเส้นทางจาก children
    //                 }
    //             }
    //             return null; // หากไม่เจอ
    //         };
    //         const path = findPath(menuItems);
    //         if (path) {
    //             console.log(`⩇⩇:⩇⩇🚨  file: FormAdmin.jsx:73  path :`, path);

    //             router.push(path); // นำทางไปยังเส้นทางที่ค้นพบ
    //         }
    //     } catch (error) {
    //         console.log(`⩇⩇:⩇⩇🚨  file: FormAdmin.jsx:133  error :`, error);
    //     }
    // };

    // Only allow one submenu to be open at a time
    
    const onOpenChange = (keys) => {


        const latestOpenKey = keys[keys.length - 1]; // Find the last opened key

        setOpenKeys(latestOpenKey ? [latestOpenKey] : []); // Set only the latest key as open, closing others
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Layout>
                    <AppSidebar

                        //handleMenuClick={handleMenuClick} 
                        //เป็นการสร้าง func ไว้ที่อื่นแล้วมาเรียกใช้ที่นี่
                        handleMenuClick={(e) => handleSideMenuClick(e,menuItems, router)}

                        collapsed={collapsed} menuItems={menuItems}
                    />

                    <Layout>
                        <AppHeader
                            setCollapsed={setCollapsed} collapsed={collapsed} colorBg={colorBgContainer}
                        />

                        <AppContent
                            colorBg={colorBgContainer} borderLG={borderRadiusLG}
                        // routes={routes}
                        >
                            {children}
                        </AppContent>


                        <AppFooter />
                    </Layout>
                </Layout>
            </Box>
        </Box>
    );
}