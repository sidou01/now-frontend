import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Avatar, Badge } from 'antd'

const { SubMenu } = Menu
const { Content, Sider } = Layout

export default () => (
  <Menu mode="horizontal" theme="light">
    <SubMenu
      style={{ float: 'right' }}
      title={
        <span className="submenu-title-wrapper">
          <span style={{ marginLeft: 24 }}>
            <Avatar
              src="https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg?resize=567%2C580&ssl=1"
              size="medium"
            />
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
    <Menu.Item key="notificaions" style={{ float: 'right' }}>
      <Badge count={3}>
        <Icon type="bell" size="large" />
      </Badge>
    </Menu.Item>
    <Menu.Item key="messages" style={{ float: 'right' }}>
      <Badge count={1}>
        <Icon type="message" size="large" />
      </Badge>
    </Menu.Item>
    <Menu.Item key="mail" style={{ float: 'right' }}>
      Sid Ahmed
    </Menu.Item>
    <Menu.Item key="logo">NOW Appointments</Menu.Item>
    <Menu.Item key="themeSwitch" />
  </Menu>
)
