import styles from '../styles/Footer.module.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Customer Service</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/shipping">Shipping Policy</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/track-order">Track Your Order</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>About Us</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/about">Our Story</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/sustainability">Sustainability</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Shop</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/best-sellers">Best Sellers</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/gift-cards">Gift Cards</a></li>
            <li><a href="/store-locator">Store Locator</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Newsletter</h3>
          <p className={styles.newsletterText}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterButton}>Subscribe</button>
          </form>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.paymentMethods}>
          <FaCcVisa className={styles.paymentIcon} />
          <FaCcMastercard className={styles.paymentIcon} />
          <FaCcPaypal className={styles.paymentIcon} />
          <span className={styles.paymentText}>Secure Payment</span>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} YourStoreName. All rights reserved.
        </div>
        <div className={styles.legalLinks}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;