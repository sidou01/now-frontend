import React, { useState } from 'react'
import Logo from '../../components/Logo'

export default () => (
  <div id="wrapper">
    <LeftWrapper />
    <div id="right">
      <div id="showcase">
        <div id="showcase-content">
          <h1 id="showcase-text">
            Manage your appointments all in <strong>one</strong> place
          </h1>
          <a href="#" className="secondary-btn">
            Start a FREE 10-day trial
          </a>
        </div>
      </div>
    </div>
  </div>
)

export const Wrapper = ({ children }) => (
  <div className="wrapper">{children}</div>
)
export const LeftWrapper = () => (
  <div id="left">
    <div id="signin">
      <Logo height="175" width="400" />
      <LoginForm />
      <Links />
    </div>
    <Footer />
  </div>
)

export const RightWrapper = ({ children }) => (
  <div className="right">{children}</div>
)

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="text-input"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="text-input"
        />
      </div>
      <button type="submit" className="primary-btn">
        Sign In
      </button>
    </form>
  )
}
export const Links = () => (
  <>
    <div className="links">
      <a href="#">Forgot Password</a>
    </div>
    <div className="or">
      <hr className="bar" />
      <span>OR</span>
      <hr className="bar" />
    </div>
    <a href="#" className="secondary-btn">
      Create an account
    </a>
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

// const Wrapper = styled('div')({
//   display: flex,
//   flexDirection: row,
// })

// const LeftWrapper = styled('div')({
//   flex: 1,
//   flexDirection: column,
//   display: flex,
//   alignItems: center,
//   height: '100vh',
//   justifyContent: center,
// })

// const RightWrapper = styled('div')({
//   flex: 1,
// })

// const LoginWrapper = styled('div')({
//   display: flex,
//   flexDirection: column,
//   justifyContent: center,
//   alignContent: center,
//   width: '80%',
//   paddingBottom: '1rem',
// })

// const LoginForm = styled('form')({
//   width: '80%',
//   paddingBottom: '3rem',
// })

// /* Logo Later */

// const Label = styled('label')({
//   fontSize: '0.9rem',
//   lineHeight: '2rem',
//   fontWeight: '500',
// })

// const TextField = styled('input')({
//   marginBottom: '1.3rem',
//   width: '100%',
//   borderRadius: '2px',
//   background: '#181818',
//   color: '#ccc',
//   padding: '0.5rem 1rem',
//   lineHeight: '1.3rem',
// })

// const PrimaryButton = styled('a')({
//   width: '100%',
// })

// const SecondaryButton = styled('a')({
//   width: '100%',
// })
