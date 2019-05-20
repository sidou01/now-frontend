import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardContent,
} from '../components'

const { Content } = Layout

export default () => {
  return (
    <Layout>
      <DashboardNavbar />
      <Layout style={{ minHeight: '100vh' }}>
        <DashboardSidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <DashboardContent />
        </Layout>
      </Layout>
    </Layout>
  )
}
