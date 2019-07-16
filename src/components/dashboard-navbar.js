import React, { useState } from 'react'
import { Avatar, Badge, Menu, Icon, Dropdown } from 'antd'
import { Link } from '@reach/router'
import { useApolloClient } from '@apollo/react-hooks'

const { SubMenu } = Menu
// const { Content, Sider } = Layout

export default props => {
  const client = useApolloClient()
  const [count, setCount] = useState(2)
  const logout = () => {
    localStorage.removeItem('authToken')
    client.writeData({
      data: {
        isLoggedIn: false,
      },
    })
  }

  const handleNotification = () => {
    if (count === 0) return
    else setCount(count - 1)
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" style={{ padding: '5px' }}>
        <Avatar
          shape="square"
          src="https://www.genolier.net/site/assets/files/17734/aapro-1.500x0.jpg"
          size="medium"
          style={{ marginRight: '10px' }}
        />
        Your Appointment got Approved by Dr Matti !
      </Menu.Item>
      <Menu.Item key="2" style={{ padding: '5px' }}>
        <Avatar
          shape="square"
          src="https://www.sheffield.ac.uk/polopoly_fs/1.739455!/image/A_Cochrane_300x300.jpg"
          size="medium"
          style={{ marginRight: '10px' }}
        />
        Dr Smith changed appointment duration from 30 minutes to 1h.
      </Menu.Item>
    </Menu>
  )
  return (
    <Menu mode="horizontal" theme="light">
      <SubMenu
        style={{ float: 'right' }}
        title={
          <span className="submenu-title-wrapper">
            <span style={{ marginLeft: 24 }}>
              <Avatar
                src="https://avatars1.githubusercontent.com/u/1411284?s=460&v=4"
                icon="user"
                size="medium"
              />
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
      <Menu.Item
        key="notificaions"
        style={{ float: 'right' }}
        onClick={handleNotification}>
        <Dropdown
          overlay={menu}
          overlayStyle={{ width: '450px' }}
          placement="bottomLeft"
          trigger={['click']}>
          <Badge count={count}>
            <Icon type="bell" size="large" />
          </Badge>
        </Dropdown>
      </Menu.Item>
      {/*
      <Menu.Item key="messages" style={{ float: 'right' }}>
        <Badge count={1}>
          <Icon type="message" size="large" />
        </Badge>
      </Menu.Item>
      */}
      {/* <Menu.Item key="mail" style={{ float: 'right' }}>
        {'Brahimi Sid Ahmed'}
      </Menu.Item> */}
      <Menu.Item key="logo">NOW Appointments</Menu.Item>
      <Menu.Item key="themeSwitch" />
    </Menu>
  )
}
