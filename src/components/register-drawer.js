import React, { useState, useEffect } from 'react'
import {
  Drawer,
  Col,
  Row,
  Select,
  Input,
  Button,
  Form,
  Icon,
  notification,
} from 'antd'
import styled from 'styled-components'
import { Steps } from 'antd'
import { useSubscription } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'

const useSteps = initialValue => {
  const [activeStep, setActiveStep] = useState(initialValue)

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const lastStep = () => {
    setActiveStep(activeStep - 1)
  }
  return [activeStep, nextStep, lastStep]
}

const { Option } = Select
const Step = Steps.Step

const REGISTER_MUTATION = gql`
  mutation register(
    $email: String!
    $fullName: String!
    $password: String!
    $gender: Gender!
    $age: Int!
  ) {
    register(
      input: {
        email: $email
        fullName: $fullName
        password: $password
        gender: $gender
        age: $age
      }
    ) {
      id
      confirmation
      fullName
      email
    }
  }
`
const CONFIRMATION_ENABLED = gql`
  subscription confirmationEnabled($userId: ID!) {
    confirmationEnabled(userId: $userId) {
      id
      email
      confirmation
    }
  }
`
const ConfirmationSection = () => {
  const { data, error, loading } = useSubscription(CONFIRMATION_ENABLED, {
    variables: { userId: 'cjvar3q4q001v09371g20p3z2' },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return <div>{data.confirmationEnabled.email} has confimed his email</div>
}

const DrawerForm = ({ form: { getFieldDecorator } }) => {
  const [visible, toggleVisible] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [activeStep, nextStep, lastStep] = useSteps(0)

  // const openNotificationWithIcon = (type, msg) => {
  //   notification[type]({
  //     message: 'Notification Title',
  //     description: `${msg}`,
  //   })
  // }

  const showDrawer = () => {
    toggleVisible(true)
  }

  const onClose = () => {
    toggleVisible(false)
  }

  const getContentForActiveStep = step => {
    switch (step) {
      case 0:
        return (
          <Mutation
            mutation={REGISTER_MUTATION}
            onCompleted={register => {
              console.log('registration went well', register)
            }}>
            {(register, { data, loading, error }) => {
              return (
                <Formik
                  initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    password2: '',
                    gender: '',
                    age: 0,
                    phone: '',
                  }}
                  render={props => (
                    <Form>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Full Name">
                            {getFieldDecorator('fullName', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your full name!',
                                },
                              ],
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                  />
                                }
                                placeholder="Enter your full name"
                                name="fullName"
                                onChange={props.handleChange('fullName')}
                              />,
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Email">
                            {getFieldDecorator('email', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your username!',
                                },
                              ],
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                  />
                                }
                                placeholder="Email"
                                name="email"
                                onChange={props.handleChange('email')}
                              />,
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Password">
                            {getFieldDecorator('password', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your Password!',
                                },
                              ],
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                  />
                                }
                                type="password"
                                name="password"
                                onChange={props.handleChange('password')}
                                placeholder="Password"
                              />,
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Confirm password">
                            {getFieldDecorator('password2', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your Password!',
                                },
                              ],
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                  />
                                }
                                type="password"
                                name="password2"
                                placeholder="Enter your password again"
                                onChange={props.handleChange('password2')}
                              />,
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Age"
                            help={props.errors.age}
                            validateStatus={props.errors.age ? 'error' : ''}>
                            {getFieldDecorator('age', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your age!',
                                },
                              ],
                            })(
                              <Input
                                name="age"
                                type="number"
                                placeholder="Enter your age"
                                onChange={props.handleChange('age')}
                              />,
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Phone number" hasFeedback>
                            {getFieldDecorator('phone', {
                              rules: [
                                {
                                  required: false,
                                  message: 'Please input your phone number!',
                                },
                              ],
                            })(
                              <Input
                                type="number"
                                placeholder="Enter your number"
                                name="phone"
                                onChange={props.handleChange('phone')}
                              />,
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Select" hasFeedback>
                            {getFieldDecorator('gender', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please select your gender!',
                                },
                              ],
                            })(
                              <Select
                                placeholder="Please select a country"
                                onChange={props.handleChange('gender')}
                                name="gender">
                                <Option value="MALE">Male</Option>
                                <Option value="FEMALE">Female</Option>
                              </Select>,
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Button
                        type="primary"
                        loading={loading}
                        onClick={() =>
                          register({
                            variables: {
                              fullName: props.values.fullName,
                              email: props.values.email,
                              password: props.values.password,
                              gender: props.values.gender,
                              age: props.values.age,
                            },
                          })
                        }>
                        Register
                      </Button>
                    </Form>
                  )}
                />
              )
            }}
          </Mutation>
        )
      case 1:
        return <ConfirmationSection />
    }
  }

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })
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
        <Steps current={activeStep}>
          <Step title="Step 1" description="This is a description." />
          <Step
            title="Step 3"
            description="Email verification"
            icon={<Icon type={activeStep === 2 ? 'loading' : 'solution'} />}
          />
          <Step title="Done" description="This is a description." />
        </Steps>
        <Form layout="vertical" hideRequiredMark>
          {getContentForActiveStep(activeStep)}
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
          <Button
            onClick={activeStep === 0 ? onClose : lastStep}
            style={{ marginRight: 8 }}>
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={nextStep} type="primary">
            {activeStep !== 2 ? 'Next' : 'Done'}
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

export default Form.create()(DrawerForm)

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
