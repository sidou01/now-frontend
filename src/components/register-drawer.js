import React, { useState, useEffect } from 'react'
import {
  Drawer,
  Col,
  Row,
  Select,
  DatePicker,
  Input,
  Button,
  Form,
  Icon,
} from 'antd'
import styled from 'styled-components'
import { Steps } from 'antd'

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

const DrawerForm = ({ form: { getFieldDecorator } }) => {
  const [visible, toggleVisible] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [activeStep, nextStep, lastStep] = useSteps(0)

  const showDrawer = () => {
    toggleVisible(true)
  }

  const onClose = () => {
    toggleVisible(false)
  }

  const getContentForActiveStep = step => {
    switch (step) {
      case 1:
        return (
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
        )
      case 2:
        return (
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
        )
      case 3:
        return (
          <>
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
          </>
        )
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
          <Step title="Step 2" description="This is a description." />
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
            onClick={activeStep === 1 ? onClose : lastStep}
            style={{ marginRight: 8 }}>
            {activeStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={nextStep} type="primary">
            {activeStep !== 3 ? 'Next' : 'Submit'}
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
