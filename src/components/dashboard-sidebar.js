import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from '@reach/router'

const { SubMenu } = Menu
const { Sider } = Layout

export default () => (
  <Sider width={200} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}>
      <Menu.Item key="sub1" title={<span />}>
        <Link to="/">
          <Icon type="user" />
          Top Services
        </Link>
      </Menu.Item>

      <Menu.Item key="sub2" title={<span />}>
        <Link to="profile">
          <Icon type="user" />
          Profile
        </Link>
      </Menu.Item>
      <SubMenu
        key="sub3"
        title={
          <span>
            <Icon type="file-search" />
            Services
          </span>
        }>
        <Menu.Item key="5">Medical</Menu.Item>
        <Menu.Item key="6">Lawyer</Menu.Item>
      </SubMenu>
      <Menu.Item key="sub4" title={<span />}>
        <Link to="calendar">
          <Icon type="calendar" />
          Calendar
        </Link>
      </Menu.Item>
      <Menu.Item key="sub5" title={<span />}>
        <Link to="settings">
          <Icon type="setting" />
          Settings
        </Link>
      </Menu.Item>

      <SubMenu
        key="sub6"
        title={
          <span>
            <Icon type="wechat" />
            Messages
          </span>
        }>
        <Menu.Item key="1">
          <Link to="sentMessages">Sent Messages</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="recievedMessages">Recieved Messages</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
)
