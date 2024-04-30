import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notFound-container">
    <img
      src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694602177/Group_7484pageNotFound_jgptqc.png"
      alt="not found"
      className="notFoundImage"
    />
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="notFound-description">
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="goBackBtn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
