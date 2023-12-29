import "./footer.scss"; 
import React from 'react'; 

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            EnglishConversation is a platform where you can learn, practice, and test your English language skills through interactive conversations.
          </p>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: info@englishconversation.com</p>
        </div>

        <div className="footer-section social">
          <h2>Connect with Us</h2>
          <div className="social-icons">
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a> */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 EnglishConversation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;