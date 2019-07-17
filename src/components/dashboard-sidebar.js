import React from 'react'
import { Layout, Menu, Icon, Avatar, Card, Switch } from 'antd'
import { Link } from '@reach/router'

// const { SubMenu } = Menu
const { Sider } = Layout
const { Meta } = Card

export default () => (
  <Sider width={200} style={{ background: '#fff', minHeight: '100vh' }}>
    <div style={{ padding: '15px' }}>
      <Card
        title={<strong>Ryan Florence</strong>}
        bordered={false}
        actions={[
          <Icon type="setting" />,
          <Icon type="edit" />,
          <Icon type="ellipsis" />,
        ]}>
        <Meta
          avatar={
            <Avatar
              size={100}
              src="https://avatars3.githubusercontent.com/u/100200?s=460&v=4"
            />
          }
        />
      </Card>
    </div>
    <Menu
      mode="inline"
      theme="light"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0, paddingTop: '1rem' }}>
      <Menu.Item key="sub1">
        <Link to="/">
          <Icon type="user" />
          Trending
        </Link>
      </Menu.Item>

      <Menu.Item key="sub3">
        <Link to="services">
          <Icon type="file-search" />
          Services
        </Link>
      </Menu.Item>
      <Menu.Item key="sub4">
        <Link to="calendar">
          <Icon type="calendar" />
          Calendar
        </Link>
      </Menu.Item>
      <Menu.Item key="sub5">
        <Link to="settings">
          <Icon type="setting" />
          Settings
        </Link>
      </Menu.Item>

      {/*
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
      */}
    </Menu>
  </Sider>
)
