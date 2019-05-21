import React from 'react'

const Dashboard = React.lazy(() => import('./pages/dashboard'))

export default () => (
  <React.Suspense fallback={<h2>loading...</h2>}>
    <Dashboard />
  </React.Suspense>
)
