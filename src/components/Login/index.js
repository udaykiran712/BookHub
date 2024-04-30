import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderInputField = () => {
    const {username} = this.state
    return (
      <div className="inputFieldContainer">
        <label htmlFor="username" className="labelName">
          Username*
        </label>
        <input
          placeholder="Enter your Username"
          type="text"
          id="username"
          className="flowControl"
          value={username}
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="inputFieldContainer">
        <label htmlFor="password" className="labelName">
          Password*
        </label>
        <input
          placeholder="Enter Your Password"
          type="password"
          id="password"
          className="flowControl"
          value={password}
          onChange={this.onChangePassword}
        />
        {showErrorMsg && <p className="errorMsg">*{errorMsg}</p>}
      </div>
    )
  }

  renderWebsiteLogo = () => (
    <div className="websiteLogoContainer">
      <img
        src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694596689/Group_7730_uuioli.png"
        alt="login website logo"
        className="bookHub"
      />
      <h1 className="websiteName">ookHub</h1>
    </div>
  )

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginPage">
        <img
          src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694590892/xrwkkzfnynuewn9zqw3l.png"
          alt="website login"
          className="lg-loginImagePage"
        />
        <img
          src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694595408/Ellipse_99_gdz1nh.png"
          alt="website login"
          className="sm-loginImagePage"
        />
        <div className="loginPage-section2">
          <form className="login-form-container" onSubmit={this.onSubmitLogin}>
            {this.renderWebsiteLogo()}
            {this.renderInputField()}
            {this.renderPasswordField()}
            <button type="submit" className="loginBtn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login