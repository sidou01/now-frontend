import React, { useState } from 'react'
import { Input, Button, Tooltip, Icon, Form } from 'antd'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { getFieldDecorator } = props.form

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOGIN}
          onCompleted={({ login }) => {
            if (login.success) {
              localStorage.setItem('authToken', login.token)
              client.writeData({
                data: {
                  isLoggedIn: true,
                  authenticatedUser: login.user,
                },
              })
            } else {
              switch (login.error.field) {
                case 'EMAIL':
                  setPasswordError('')
                  setEmailError(login.error.msg)
                  break
                case 'PASSWORD':
                  setEmailError('')
                  setPasswordError(login.error.msg)
              }
            }
          }}>
          {(login, { loading, data }) => {
            data && console.log(data.login.error)
            return (
              <Form className="login-form" style={{ width: '80%' }}>
                <label
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: '2rem',
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                  Email
                </label>
                <Form.Item
                  help={emailError}
                  validateStatus={emailError ? 'error' : ''}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="Please enter your email here."
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="email"
                      onChange={e => setEmail(e.target.value)}
                      suffix={
                        <Tooltip title="Please enter a verified email">
                          <Icon
                            type="info-circle"
                            style={{ color: 'rgba(0,0,0,.45)' }}
                          />
                        </Tooltip>
                      }
                    />,
                  )}
                </Form.Item>
                <label
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: '2rem',
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                  Password
                </label>
                <Form.Item
                  help={passwordError}
                  validateStatus={passwordError ? 'error' : ''}>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ],
                  })(
                    <Input.Password
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Please enter your password here."
                      size="large"
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                    />,
                  )}
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: '100%' }}
                  loading={loading}
                  onClick={() => login({ variables: { email, password } })}>
                  Sign In
                </Button>
              </Form>
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}
export default Form.create({ name: 'normal_login' })(LoginForm)
