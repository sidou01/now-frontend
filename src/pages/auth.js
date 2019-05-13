import React from 'react'
import { LoginForm, Links, Footer } from '../components'
import styled from 'styled-components'
import { Query } from 'react-apollo'

// import Logo from '../../components/Logo'

export default () => (
  <Wrapper>
    <LeftWrapper>
      <div id="signin">
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

const Wrapper = styled.div`
  color: #fff;
  background: #181818;
  display: flex;
  flex-direction: row;
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
