import { Link } from "react-router-dom";
import styles from "../styles/ThankYou.module.css";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";

const ThankYou = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <FiCheckCircle className={styles.checkIcon} />
        </div>

        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.message}>
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Order Number:</span>
            <span className={styles.detailValue}>#ORD-123456</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Estimated Delivery:</span>
            <span className={styles.detailValue}>June 15, 2023</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/orders" className={styles.orderButton}>
            <FiShoppingBag /> View Order
          </Link>
          <Link to="/products" className={styles.continueButton}>
            Continue Shopping
          </Link>
        </div>

        <p className={styles.supportText}>
          Need help? <Link to="/contact">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
