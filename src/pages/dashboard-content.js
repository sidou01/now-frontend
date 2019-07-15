import React from "react"
import { Layout } from "antd"
import { Router } from "@reach/router"
import { TopServices, Calendar, Settings, Services, Profile, ServiceProfile } from "../components"

//lazy load one of the components

const { Content } = Layout

export default () => {
  return (
    <Layout style={{ padding: "0 2px 24px" }}>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          overflow: "scroll",
          height: "100vh"
        }}
      >
        <Router>
          <TopServices path="/" />
          <Calendar path="calendar" />
          <Settings path="settings" />
          <Profile path="profile" />
          <Services path="services" />
          <ServiceProfile path="service/:id" />
        </Router>
      </Content>
    </Layout>
  )
}
