import React, { useState, useEffect } from 'react'
import { Drawer, Button, Form, Icon, Spin, Alert } from 'antd'
import styled from 'styled-components'
import { Steps } from 'antd'
import { useSubscription } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import RegisterForm from './register-form'

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

const Step = Steps.Step

const CONFIRMATION_ENABLED = gql`
  subscription confirmationEnabled($userId: ID!) {
    confirmationEnabled(userId: $userId) {
      id
      email
      confirmation
    }
  }
`
const ConfirmationSection = ({ toggleConfirmationStep, userId }) => {
  const { data, error, loading } = useSubscription(CONFIRMATION_ENABLED, {
    variables: { userId },
  })

  if (error) {
    return <div>Error! {error.message}</div>
  }

  if (!loading) {
    toggleConfirmationStep(true)
  }
  return (
    <div style={{ marginTop: '15%' }}>
      <Spin
        indicator={<Icon type="loading" style={{ fontSize: 34 }} spin />}
        spinning={loading}>
        <Alert
          message="Email has been verfied"
          description="Click next to move to the next step."
          type="info"
        />
      </Spin>
    </div>
  )
}

const RegisterDrawer = props => {
  const [visible, toggleVisible] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [activeStep, nextStep, lastStep] = useSteps(0)
  const [userId, setUserId] = useState('')

  const [isStepDone, setIsStepDone] = useState(false)

  const showDrawer = () => {
    toggleVisible(true)
  }

  const onClose = () => {
    toggleVisible(false)
  }

  useEffect(() => {
    setIsStepDone(false)
  }, [activeStep])

  const getContentForActiveStep = step => {
    switch (step) {
      case 0:
        return (
          <RegisterForm setIsStepDone={setIsStepDone} setUserId={setUserId} />
        )
      case 1:
        return (
          <ConfirmationSection
            toggleConfirmationStep={setIsStepDone}
            userId={userId}
          />
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
          <Button
            onClick={activeStep !== 2 ? nextStep : onClose}
            type="primary"
            disabled={!isStepDone && activeStep !== 2}>
            {activeStep !== 2 ? 'Next' : 'Done'}
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

export default RegisterDrawer
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
