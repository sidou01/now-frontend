import React from 'react'
import { Layout } from 'antd'
import { DashboardSidebar, DashboardNavbar } from '../components'
import DashboardContent from './dashboard-content'

export default ({ authUser }) => {
  return (
    <Layout>
      <DashboardNavbar authUser={authUser} />
      <Layout>
        <DashboardSidebar />
        <DashboardContent />
      </Layout>
    </Layout>
  )
}
