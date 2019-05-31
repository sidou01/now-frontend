import React, { useState } from 'react'
import { Input, Button, Icon, Form } from 'antd'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Spin } from 'antd'
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
        email
        avatar
      }
    }
  }
`

const LoginForm = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [passwordError, setPasswordError] = useState(null)
  const [emailError, setEmailError] = useState(null)

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
                  setPasswordError(null)
                  setEmailError(login.error.msg)
                  break
                case 'PASSWORD':
                  setEmailError(null)
                  setPasswordError(login.error.msg)
                  break
                default:
                  console.log(login.error)
              }
            }
          }}>
          {(login, { loading, data }) => {
            data && console.log(data.login)
            return (
              <Form className="login-form" style={{ width: '80%' }}>
                <label
                  name="email"
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
                  validateStatus={emailError ? 'error' : undefined}
                  hasFeedback>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(
                    <Input
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                    />,
                  )}
                </Form.Item>
                <label
                  name="password"
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
                  validateStatus={passwordError ? 'error' : undefined}
                  hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ],
                  })(
                    <Input
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                    />,
                  )}
                </Form.Item>
                {!loading ? (
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: '100%' }}
                    onClick={() =>
                      login({
                        variables: {
                          email,
                          password,
                        },
                      })
                    }>
                    Sign In
                  </Button>
                ) : (
                  <Spin
                    style={{ fontSize: 24, marginLeft: '45%' }}
                    indicator={<Icon type="loading" spin />}
                  />
                )}
              </Form>
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}
export default Form.create({ name: 'normal_login' })(LoginForm)
