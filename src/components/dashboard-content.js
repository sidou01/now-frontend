import React from 'react'
import { Layout } from 'antd'
import { Router, Link } from '@reach/router'

const { Content } = Layout

export default () => {
  return (
    <Content
      style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}>
      Content
    </Content>
  )
}
