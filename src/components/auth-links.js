import React from "react"
import RegisterDrawer from "./register-drawer"
import styled from "styled-components"

export default function Links() {
  return (
    <>
      <div style={{ width: "80%" }}>
        <ForgotPassword href="#">Forgot Password</ForgotPassword>
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "1.2rem"
        }}
      >
        <hr
          style={{
            width: "80%",
            flex: "auto",
            border: "none",
            height: "1px",
            background: "#aaa"
          }}
        />
        <span style={{ color: "#ccc", padding: "0 0.8rem" }}>OR</span>
        <hr
          style={{
            width: "80%",
            flex: "auto",
            border: "none",
            height: "1px",
            background: "#aaa",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "1.2rem"
          }}
        />
      </div>
      <RegisterDrawer />
    </>
  )
}

const ForgotPassword = styled.a`
  display: block;
  text-decoration: none;
  text-align: center;
  color: #fff;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  width: 100%;
  transition: all 0.5s;
`
