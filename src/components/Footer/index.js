import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <div className="footerIconsContainer">
      <FaGoogle className="footIcons" />
      <FaTwitter className="footIcons" />
      <FaInstagram className="footIcons" />
      <FaYoutube />
    </div>
    <p>Contact us</p>
  </div>
)

export default Footer
