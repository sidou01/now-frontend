import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from 'react-apollo-hooks'
import styled from 'styled-components'
import { Input, Button, Tooltip, Icon, Form } from 'antd'
import { Drawer, Col, Row, Select, DatePicker } from 'antd'

// import Logo from '../../components/Logo'

export default () => (
  <Wrapper>
    <LeftWrapper>
      <div id="signin">
        <WrappedLoginForm />
        <Links />
      </div>
      <Footer />
    </LeftWrapper>
    <RightWrapper>
      <Showcase>
        <div>
          <h1>
            Manage your appointments all in <strong>one</strong> place
          </h1>
          <ShowcaseButton secondary href="#">
            Start a FREE 10-day trial
          </ShowcaseButton>
        </div>
      </Showcase>
    </RightWrapper>
  </Wrapper>
)

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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

export const LoginForm = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, toggleLoading] = useState(false)

  const { getFieldDecorator } = props.form

  const login = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
  })

  const client = useApolloClient()

  const handleLogin = () => {
    toggleLoading(true)
    login(email, password)
      .then(({ data: { login } }) => {
        localStorage.setItem('authToken', login.token)
        if (login.success) {
          client.writeData({
            data: {
              isLoggedIn: true,
              authenticatedUser: login.user,
            },
          })
        } else {
          login.error.field === 'EMAIL'
            ? setEmailError(login.error.msg)
            : setPasswordError(login.error.msg)
        }
        toggleLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div>
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
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              size="large"
              placeholder="Please enter your email here."
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Please enter your password here."
              size="large"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />,
          )}
        </Form.Item>
        <Button
          type="primary"
          onClick={handleLogin}
          size="large"
          style={{ width: '100%' }}
          loading={loading}>
          Sign In
        </Button>
      </Form>
    </div>
  )
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm)

export const Links = () => {
  const [visible, toggleVisible] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  const showDrawer = () => {
    toggleVisible(true)
  }

  const onClose = () => {
    toggleVisible(false)
  }

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })
  return (
    <>
      <div style={{ width: '80%' }}>
        <ForgotPassword href="#">Forgot Password</ForgotPassword>
      </div>
      <div
        style={{
          width: '80%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '1.2rem',
        }}>
        <hr
          style={{
            width: '80%',
            flex: 'auto',
            border: 'none',
            height: '1px',
            background: '#aaa',
          }}
        />
        <span style={{ color: '#ccc', padding: '0 0.8rem' }}>OR</span>
        <hr
          style={{
            width: '80%',
            flex: 'auto',
            border: 'none',
            height: '1px',
            background: '#aaa',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '1.2rem',
          }}
        />
      </div>
      <SignUpDrawer
        visible={visible}
        width={width}
        onClose={onClose}
        showDrawer={showDrawer}
      />
    </>
  )
}

export const Footer = () => (
  <footer id="main-footer">
    <p>Copyright &copy; 2019, NOW All Rights Reserved</p>
    <div>
      <a href="#">terms of use</a> | <a href="#">Privacy Policy</a>
    </div>
  </footer>
)

// export const Logo = () => (
//   <div className="logo">
//     <img src="https://image.ibb.co/hW1YHq/login-logo.png" alt="Sluralpright" />
//   </div>
// )

const { Option } = Select

const DrawerForm = ({
  visible,
  width,
  onClose,
  showDrawer,
  form: { getFieldDecorator },
}) => {
  return (
    <div>
      <LocalButton onClick={showDrawer} secondary width="80%">
        Create an account
      </LocalButton>
      <Drawer
        title="Sign Up"
        width={(width * 60) / 100}
        onClose={onClose}
        visible={visible}>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                })(<Input placeholder="Please enter user name" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Url">
                {getFieldDecorator('url', {
                  rules: [{ required: true, message: 'Please enter url' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Owner">
                {getFieldDecorator('owner', {
                  rules: [
                    { required: true, message: 'Please select an owner' },
                  ],
                })(
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Type">
                {getFieldDecorator('type', {
                  rules: [
                    { required: true, message: 'Please choose the type' },
                  ],
                })(
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Approver">
                {getFieldDecorator('approver', {
                  rules: [
                    { required: true, message: 'Please choose the approver' },
                  ],
                })(
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="DateTime">
                {getFieldDecorator('dateTime', {
                  rules: [
                    { required: true, message: 'Please choose the dateTime' },
                  ],
                })(
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ],
                })(
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter url description"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onClose} type="primary">
            Submit
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

const SignUpDrawer = Form.create()(DrawerForm)

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  @media (min-width: 1200px) {
    flex: 4;
  }
`
const RightWrapper = styled.div`
  flex: 1;
  @media (min-width: 1200px) {
    flex: 6;
  }
`

const Showcase = styled.div`
  display: flex;
  background: url('https://images.unsplash.com/photo-1554196278-879b03378ef5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')
    no-repeat center center / cover;
  height: 100vh;
  justify-content: center;
  align-items: center;

  & > * {
    z-index: 2;
  }

  &::after {
    content: '';
    opacity: 0.6;
    position: absolute;
    top: 0;
    right: 0;
    left: 40%;
    bottom: 0;
    background-image: linear-gradient(to bottom right, #002f4b, #dc4225);
    z-index: 1;
  }
`

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
const Wrapper = styled.div`
  color: #fff;
  background: #181818;
  display: flex;
  flex-direction: row;
`

const LocalButton = styled.a`
  padding: 0.7rem 1rem;
  height: 2.7rem;
  display: block;
  border: ${props => (props.secondary ? '1px solid #f4f4f4' : '1px')};
  border-radius: 2px;
  font-weight: 500;
  background: ${props => (props.secondary ? 'none' : '#2962ff')};
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.5s;
  width: ${props => props.width}

  &:hover {
    background: ${props => (props.secondary ? '' : '#0d47a1')};
    border-color: ${props => (props.secondary ? '#2962ff' : '')};
    color: ${props => (props.secondary ? '#2962ff' : '')};
`

const ShowcaseButton = styled.a`
  padding: 0.7rem 1rem;
  height: 2.7rem;
  display: block;
  border: 1px solid #f4f4f4;
  border-radius: 2px;
  font-weight: 500;
  background: none;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.5s;
  width: 60%;
  margin: auto;

  &:hover {
    color: #aaa;
    border-color: #aaa;
  }
`
