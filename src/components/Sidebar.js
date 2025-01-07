import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    HomeOutlined,
    ShoppingOutlined,
    DollarOutlined
} from '@ant-design/icons';

const Sidebar = () => (
    <Menu mode="inline" theme="dark">
        <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/ad-management">Ad Management</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DollarOutlined />}>
            <Link to="/revenue-management">Revenue Management</Link>
        </Menu.Item>
        {/* ... other menu items ... */}
    </Menu>
);

export default Sidebar; 