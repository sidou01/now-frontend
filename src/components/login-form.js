import React, { useState } from "react"
import { Input, Button, Tooltip, Icon, Form } from "antd"
import { useMutation, useApolloClient } from "react-apollo-hooks"
import gql from "graphql-tag"

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      success
      error {
        msg
        field
      }
      token
      user {
        id
        fullName
      }
    }
  }
`

const LoginForm = props => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, toggleLoading] = useState(false)

  const { getFieldDecorator } = props.form

  const login = useMutation(LOGIN, {
    variables: {
      email,
      password
    }
  })

  const client = useApolloClient()

  const handleLogin = () => {
    toggleLoading(true)
    login(email, password)
      .then(({ data: { login } }) => {
        localStorage.setItem("authToken", login.token)
        if (login.success) {
          client.writeData({
            data: {
              isLoggedIn: true,
              authenticatedUser: login.user
            }
          })
        }
        toggleLoading(false)
      })
      .catch(error => console.log(error))
  }
  return (
    <div>
      <Form className="login-form" style={{ width: "80%" }}>
        <label
          style={{
            fontSize: "0.9rem",
            lineHeight: "2rem",
            fontWeight: "500",
            color: "#fff"
          }}
        >
          Email
        </label>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              size="large"
              placeholder="Please enter your email here."
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="email"
              onChange={e => setEmail(e.target.value)}
              suffix={
                <Tooltip title="Please enter a verified email">
                  <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          )}
        </Form.Item>
        <label
          style={{
            fontSize: "0.9rem",
            lineHeight: "2rem",
            fontWeight: "500",
            color: "#fff"
          }}
        >
          Password
        </label>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Please enter your password here."
              size="large"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          )}
        </Form.Item>
        <Button
          type="primary"
          onClick={handleLogin}
          size="large"
          style={{ width: "100%" }}
          loading={loading}
        >
          Sign In
        </Button>
      </Form>
    </div>
  )
}
export default Form.create({ name: "normal_login" })(LoginForm)
