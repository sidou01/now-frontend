import React from 'react'
import { Layout } from 'antd'
import { DashboardSidebar, DashboardNavbar } from '../components'
import DashboardContent from './dashboard-content'

export default props => {
  return (
    <Layout>
      <DashboardNavbar />
      <Layout>
        <DashboardSidebar />
        <DashboardContent />
      </Layout>
    </Layout>
  )
}
