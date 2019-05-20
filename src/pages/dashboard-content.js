import React from 'react'
import { Layout } from 'antd'
import { Router } from '@reach/router'
import {
  TopServices,
  Calendar,
  Settings,
  Services,
  Profile,
  SentMessages,
  RecievedMessages,
} from '../components'

//lazy load one of the components

const { Content } = Layout

export default () => {
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}>
        <Router>
          <TopServices path="/" />
          <Calendar path="calendar" />
          <Settings path="settings" />
          <Profile path="profile" />
          <Services path="services" />
          <SentMessages path="recievedMessages" />
          <RecievedMessages path="sentMessages" />
        </Router>
      </Content>
    </Layout>
  )
}
