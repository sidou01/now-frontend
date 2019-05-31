import React from 'react'
import { Menu, Icon } from 'antd'
import { Avatar, Badge } from 'antd'
import { Link } from '@reach/router'
import { useApolloClient } from '@apollo/react-hooks'

const { SubMenu } = Menu
// const { Content, Sider } = Layout

export default ({ authUser }) => {
  const client = useApolloClient()
  const logout = () => {
    localStorage.removeItem('authToken')
    client.writeData({
      data: {
        isLoggedIn: false,
        authenticatedUser: null,
      },
    })
  }
  return (
    <Menu mode="horizontal" theme="light">
      <SubMenu
        style={{ float: 'right' }}
        title={
          <span className="submenu-title-wrapper">
            <span style={{ marginLeft: 24 }}>
              <Avatar src={authUser.avatar} icon="user" size="medium" />
            </span>
          </span>
        }>
        <Menu.Item key="setting:1">
          <Link to="/profile">
            <Icon type="profile" />
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="setting:3" onClick={logout}>
          <Icon type="logout" />
          Logout
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="notificaions" style={{ float: 'right' }}>
        <Badge count={3}>
          <Icon type="bell" size="large" />
        </Badge>
      </Menu.Item>
      {/*
      <Menu.Item key="messages" style={{ float: 'right' }}>
        <Badge count={1}>
          <Icon type="message" size="large" />
        </Badge>
      </Menu.Item>
      */}
      <Menu.Item key="mail" style={{ float: 'right' }}>
        {authUser.fullName}
      </Menu.Item>
      <Menu.Item key="logo">NOW Appointments</Menu.Item>
      <Menu.Item key="themeSwitch" />
    </Menu>
  )
}
