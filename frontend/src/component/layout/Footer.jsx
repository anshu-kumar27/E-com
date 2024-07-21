import React from 'react'
import {Link} from 'react-router-dom'
import '../style/footer.css'
export const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
          <h4>Download our Ap4</h4>
          <p>Download App from Andriod and IOS mobile phone</p>
        </div>
        <div className="midFooter">
          <h1> Ecommerce </h1>
          <p>High quality is our first priority</p>
          <p>Copyrights 2024 &copy; MeAnshu</p>
        </div>
        <div className="rightfooter">
          <h4>Follw Us</h4>
          <Link to='/'>instagram</Link>
          <Link to='/'>Youtube</Link>
          <Link to='/'>Facebook</Link>

        </div>
    </footer>
  )
}

export default Footer