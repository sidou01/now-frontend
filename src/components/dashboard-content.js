import React from 'react'
import { Layout } from 'antd'
import { Router } from '@reach/router'

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
          <Profile path="profile" />
          <Settings path="settings" />
          <Services path="services" />
          <SentMessags path="recievedMessages" />
          <RecievedMessages path="sentMessages" />
        </Router>
      </Content>
    </Layout>
  )
}

const Calendar = () => <h1>calendar</h1>
const TopServices = () => <h1>Top Services</h1>
const Services = () => <h1>Services</h1>
const Settings = () => <h1>Settings</h1>
const Profile = () => <h1>profile</h1>
const SentMessags = () => <h1>sent messages</h1>
const RecievedMessages = () => <h1>recieved messages</h1>
