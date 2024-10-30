'use client'
import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar, Space, Layout, Menu, Grid, Typography } from 'antd';
import { Toolbar } from '@mui/material';
import { useSession } from 'next-auth/react';

const { Sider } = Layout;
const { Title, Text } = Typography;
const { SubMenu } = Menu;
const AppSidebar = ({ collapsed, handleMenuClick, menuItems, onOpenChange, openKeys, }) => {

  // const navigate = useNavigate();  // ใช้ useNavigate

  // const store = JSON.parse(localStorage.getItem('auth-storage'))

  // let username = store ? store.state.user.userPayLoad.user.username : ""
  // let role = store ? store.state.user.userPayLoad.user.role : ""


  const { data: session } = useSession()

 
  const username = 'keng@admin'
  const role = 'Develop'

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Toolbar
        style={{ padding: '3px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Space direction="horizontal" size={16} align="center" className='profile'
        >
          <Avatar
            className='profileAvatar'
            shape="square"
            size="large"
            icon={<UserOutlined />}
          />
          {!collapsed && (
            <Space direction="vertical" size={4} style={{ textAlign: 'left' }}>
              <Text style={{ fontSize: '12px' }}><b>ชื่อ : </b> {session?.user?.username.toUpperCase().split('@')[0]}</Text>
              <Text style={{ fontSize: '12px' }}><b>ระดับ : </b>{session?.user?.role.toUpperCase()}</Text>
            </Space>
          )}
        </Space>
      </Toolbar>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={handleMenuClick}
        // items={menuItems}
        items={menuItems.map(item => ({
          ...item,
          label: collapsed ? null : item.label, // ถ้า collapsed เป็น true จะไม่แสดง label
          children: item.children
            ? item.children.map(subItem => ({
              ...subItem,
              label: collapsed ? null : subItem.label, // ซ่อน label ของเมนูย่อยด้วย
            }))
            : [],
        }))}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
      />
    </Sider>
  );
};

export default AppSidebar;
