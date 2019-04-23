import React from 'react'
import './App.css'

const App = () => {
  return <SignInPage />
}

function SignInPage() {
  return (
    <div id="wrapper">
      <div id="left">
        <div id="signin">
          <div className="logo">
            <img src="https://image.ibb.co/hW1YHq/login-logo.png" alt="now" />
          </div>
          <form>
            <div>
              <label>Email</label>
              <input type="text" className="text-input" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" className="text-input" />
            </div>
            <button type="submit" className="primary-btn">
              Sign In
            </button>
          </form>
          <div className="links">
            <a href="#">Forgot Password</a>
            <a href="#">Sign Up</a>
          </div>
          <div className="or">
            <hr className="bar" />
            <span>OR</span>
            <hr className="bar" />
          </div>
          <a href="#" className="secondary-btn">
            Create an account
          </a>
        </div>
        <footer id="main-footer">
          <p>Copyright &copy; 2019, NOW All Rights Reserved</p>
          <div>
            <a href="#">terms of use</a> | <a href="#">Privacy Policy</a>
          </div>
        </footer>
      </div>
      <div id="right">
        <div id="showcase">
          <div id="showcase-content">
            <h1 id="showcase-text">
              Let's create the future <strong>together</strong>
            </h1>
            <a href="#" className="secondary-btn">
              Start a FREE 10-day trial
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
