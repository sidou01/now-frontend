import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Avatar, Badge } from 'antd'

const { SubMenu } = Menu
const { Content, Sider } = Layout

export default () => (
  <Menu mode="horizontal" theme="dark">
    <SubMenu
      style={{ float: 'right' }}
      title={
        <span className="submenu-title-wrapper">
          Account
          <span style={{ marginLeft: 24 }}>
            <Badge count={1}>
              <Avatar icon="user" size="small" />
            </Badge>
          </span>
        </span>
      }>
      <Menu.Item key="setting:1">
        <Icon type="profile" />
        Profile
      </Menu.Item>
      <Menu.Item key="setting:3">
        <Icon type="logout" />
        Logout
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="mail" style={{ float: 'right' }}>
      Sid Ahmed
    </Menu.Item>
    <Menu.Item key="logo">NOW Appointments</Menu.Item>
    <Menu.Item key="themeSwitch" />
  </Menu>
)
