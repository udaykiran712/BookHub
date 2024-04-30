import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {Component} from 'react'
import HomeContext from '../../context/homeContext'

class Header extends Component {
  state = {
    showSlideDown: false,
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickHamburger = () => {
    this.setState(prevState => ({showSlideDown: !prevState.showSlideDown}))
  }

  renderSlideDown = () => this.renderNavOptions()

  renderNavOptions = () => (
    <HomeContext.Consumer>
      {value => {
        const {activeTabId, onChangeTab} = value
        return (
          <>
            <Link to="/" className="link">
              <p
                id="HOME"
                className={`${
                  activeTabId === 'HOME' ? 'nav-option isActive' : 'nav-option'
                }`}
                onClick={onChangeTab}
              >
                Home
              </p>
            </Link>
            <Link to="/shelf" className="link">
              <p
                id="BOOKSHELVES"
                className={`${
                  activeTabId === 'BOOKSHELVES'
                    ? 'nav-option isActive'
                    : 'nav-option'
                }`}
                onClick={onChangeTab}
              >
                Bookshelves
              </p>
            </Link>
            <button
              type="button"
              className="logoutBtn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </>
        )
      }}
    </HomeContext.Consumer>
  )

  render() {
    const {showSlideDown} = this.state
    return (
      <>
        <div className="headerContainer">
          <Link to="/" className="websiteLogoContainer">
            <img
              src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694596689/Group_7730_uuioli.png"
              alt="website logo"
              className="bookHub"
            />
            <h1 className="websiteName">ookHub</h1>
          </Link>

          <div className="hamburger">
            <GiHamburgerMenu onClick={this.onClickHamburger} />
          </div>

          <div className="navbarOptions-container">
            {this.renderNavOptions()}
          </div>
        </div>
        {showSlideDown && (
          <div className="slideDownContainer">
            {this.renderSlideDown()}
            <AiOutlineCloseCircle
              className="closeOption"
              onClick={this.onClickHamburger}
            />
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
