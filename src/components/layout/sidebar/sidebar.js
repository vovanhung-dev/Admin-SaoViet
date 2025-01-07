import { MessageOutlined, AuditOutlined,BankFilled, ContainerOutlined, BarsOutlined, DashboardOutlined, FundProjectionScreenOutlined, FileDoneOutlined, ShoppingOutlined, UserOutlined, HeatMapOutlined, SafetyCertificateOutlined, RocketOutlined, HotelOutlined, BedOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import "./sidebar.css";

const { Sider } = Layout;

function Sidebar() {

  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState([]);

  const menuSidebarAdmin = [
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />
    },
    {
      key: "account-management",
      title: "Quản Lý Tài Khoản",
      link: "/account-management",
      icon: <UserOutlined />
    },
    {
      key: "asset-list",
      title: "Quản lý danh mục",
      link: "/asset-list",
      icon: <ShoppingOutlined />
    },
    {
      key: "ad-management",
      title: "Quản lý truy cập web",
      link: "/ad-management",
      icon: <FileDoneOutlined />
    },
    {
      key: "game-block-management",
      title: "Quản Lý Chặn Game",
      link: "/game-block-management",
      icon: <HeatMapOutlined />
    },
    {
      key: "image-management",
      title: "Quản Lý Hình Ảnh",
      link: "/image-management",
      icon: <ContainerOutlined />
    },
    {
      key: "news-list",
      title: "Quản lý tin tức",
      link: "/news-list",
      icon: <MessageOutlined />
    },
  ];

  const menuSidebarHost = [
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />
    },
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [])



  const navigate = (link, key) => {
    history.push(link);
  }

  useEffect(() => {
  })

  return (
    <Sider
      className={'ant-layout-sider-trigger'}
      width={230}
      style={{
        position: "fixed",
        top: 70,
        height: 'calc(100% - 60px)',
        left: 0,
        padding: 0,
        zIndex: 1,
        marginTop: 0,
        boxShadow: " 0 1px 4px -1px rgb(0 0 0 / 15%)",
        overflowY: 'auto',
        background: '#FFFFFF'
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={location.pathname.split("/")}
        defaultOpenKeys={['account']}
        style={{ height: '100%', borderRight: 0, backgroundColor: "#FFFFFF" }}
        theme='light'
      >

        {user.role === "isPartner" ? (
          menuSidebarHost.map((map) => (
            <Menu.Item
              onClick={() => navigate(map.link, map.key)}
              key={map.key}
              icon={map.icon}
              className="customeClass"
            >
              {map.title}
            </Menu.Item>
          ))
        ) : user.role === "isAdmin" ? (
          menuSidebarAdmin.map((map) => (
            <Menu.Item
              onClick={() => navigate(map.link, map.key)}
              key={map.key}
              icon={map.icon}
              className="customeClass"
            >
              {map.title}
            </Menu.Item>
          ))
        ) : null}
      </Menu>

    </Sider >
  );
}

export default Sidebar;