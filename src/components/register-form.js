import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Col, Row, Select, Input, Button, Form, Icon, notification } from 'antd'
import gql from 'graphql-tag'
import { Formik } from 'formik'

const { Option } = Select
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
const RegisterForm = props => {
  const [confirmDirty, setConfirm] = useState(false)

  const getFieldDecorator = props.form.getFieldDecorator
  const handleConfirmBlur = e => {
    const value = e.target.value
    setConfirm(confirmDirty || !!value)
  }
  const compareToFirstPassword = (rule, value, callback) => {
    const form = props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    const form = props.form
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Registration Successfull',
      description:
        'Please click next to move the next step, check your email and click on the link sent to you to complete the next step.',
    })
  }

  return (
    <Mutation
      mutation={REGISTER_MUTATION}
      onCompleted={register => {
        console.log('registration went well', register.register.id)
        props.setIsStepDone(true)
        props.setUserId(register.register.id)
        openNotificationWithIcon('success')
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
                    <Form.Item label="Email" hasFeedback>
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid email!',
                          },
                          {
                            required: true,
                            message: 'Please input your email!',
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
                          {
                            validator: validateToNextPassword,
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
                          {
                            validator: compareToFirstPassword,
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
                          onBlur={handleConfirmBlur}
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
                      validateStatus={props.errors.age ? 'error' : ''}
                      hasFeedback>
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
}
export default Form.create()(RegisterForm)
