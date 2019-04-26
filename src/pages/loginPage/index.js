import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'

import Logo from '../../components/Logo'

export default () => (
  <Wrapper>
    <LeftWrapper>
      <div id="signin">
        <Logo height="175" width="400" />
        <LoginForm />
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
      error
      token
      user {
        id
        fullName
      }
    }
  }
`
export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
  })

  const handleLogin = async () => {
    const data = await login(email, password)
    localStorage.setItem('authToken', data.data.login.token)
  }
  return (
    <form>
      <div>
        <Label>Email</Label>
        <TextField
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label>Password</Label>
        <TextField
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" onClick={handleLogin}>
        Sign In
      </Button>
    </form>
  )
}

export const Links = () => (
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
    <Button href="#" secondary width="80%">
      Create an account
    </Button>
  </>
)

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
const TextField = styled.input`
  margin-bottom: 1.3rem;
  width: 100%;
  border-radius: 2px;
  background: #181818;
  color: #ccc;
  padding: 0.5rem 1rem;
  line-height: 1.3rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: 500;
`
const Wrapper = styled.div`
  color: #fff;
  background: #181818;
  display: flex;
  flex-direction: row;
`

const Button = styled.a`
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
