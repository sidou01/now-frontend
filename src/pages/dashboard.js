import React from 'react'
import { Layout } from 'antd'
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardContent,
} from '../components'

export default () => {
  return (
    <Layout>
      <DashboardNavbar />
      <Layout style={{ minHeight: '100vh' }}>
        <DashboardSidebar />
        <DashboardContent />
      </Layout>
    </Layout>
  )
}
