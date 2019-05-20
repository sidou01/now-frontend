import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Router, Link } from '@reach/router'

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
        <Icon type="user" />
        Profile
      </Menu.Item>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="file-search" />
            Services
          </span>
        }>
        <Menu.Item key="5">Medecin</Menu.Item>
        <Menu.Item key="6">Lawyer</Menu.Item>
      </SubMenu>
      <Menu.Item key="sub3" title={<span />}>
        <Icon type="calendar" />
        Calendar
      </Menu.Item>
      <Menu.Item key="sub4" title={<span />}>
        <Icon type="setting" />
        Settings
      </Menu.Item>

      <SubMenu
        key="sub5"
        title={
          <span>
            <Icon type="wechat" />
            Messages
          </span>
        }>
        <Menu.Item key="1">Sent Messages</Menu.Item>
        <Menu.Item key="2">Recieved Messages</Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
)
