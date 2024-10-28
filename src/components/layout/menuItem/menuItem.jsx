import { UploadOutlined, UserOutlined, VideoCameraOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons';


const menuItems = [
    {
        key: '1',
        label: 'ห้องพัก',
        type: 'group',
        children: [
            {
                key: 'sub1',
                label: 'จัดการห้องพัก',
                icon: <UploadOutlined />,
                children: [
                    { key: '11', label: 'เพิ่มห้องพัก', path: '/dashboard/setting' },
                    { key: '12', label: 'ห้องพัก', path: '/admin/dashboard/listroom' },
                    { key: '13', label: 'stepper', path: '/admin/dashboard/stepper' },
                    // { key: '13', label: 'MainPage', path: '/admin/dashboard/create' },
                    // { key: '14', label: 'Option 4', path: '/admin/dashboard/option4' },
                ],
            },
        ],
    },
    {
        key: '2',
        label: 'ตั้งค่า',
        type: 'group',
        children: [
            {
                key: 'sub2',
                label: 'Setting',
                icon: <UserOutlined />,
                children: [
                    { key: '21', label: 'Table', path: '/setting/table/v3' },
                    { key: '22', label: 'HomePage', path: '/setting/home' },
                    { key: '23', label: 'MainPage', path: '/setting/mainpage' },
                    { key: '24', label: 'Option 4', path: '/setting/option4' },
                ],
            },
        ],
    }, {
        key: '3',
        label: 'ระบบ',
        type: 'group',
        children: [
            {
                key: 'sub3',
                label: 'system',
                icon: <MailOutlined />,
                children: [
                    { key: '31', label: 'Table', path: '/system/table/v2' },
                    { key: '32', label: 'HomePage', path: '/admin/dashboard/home' },
                    { key: '33', label: 'MainPage', path: '/admin/dashboard/mainpage' },
                    { key: '34', label: 'Option 4', path: '/admin/dashboard/option4' },
                ],
            },
            {
                key: 'logout',
                label: 'ออกจากระบบ',
                icon: <LogoutOutlined />,

            },
        ],
    },
];


export default menuItems