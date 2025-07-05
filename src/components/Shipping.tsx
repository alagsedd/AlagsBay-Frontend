import styles from "../styles/Shipping.module.css";
import { FiTruck, FiClock, FiBox, FiRefreshCw, FiShield } from "react-icons/fi";

const Shipping = () => {
  const shippingOptions = [
    {
      id: 1,
      title: "Standard Shipping",
      price: "$4.99",
      time: "3-5 business days",
      icon: <FiTruck className={styles.icon} />,
      description: "Reliable delivery with tracking information",
    },
    {
      id: 2,
      title: "Express Shipping",
      price: "$9.99",
      time: "1-2 business days",
      icon: <FiClock className={styles.icon} />,
      description: "Priority handling for faster delivery",
    },
    {
      id: 3,
      title: "Free Shipping",
      price: "FREE",
      time: "5-7 business days",
      icon: <FiBox className={styles.icon} />,
      description: "On orders over $50",
    },
  ];

  const policies = [
    {
      id: 1,
      title: "Returns",
      icon: <FiRefreshCw className={styles.icon} />,
      content:
        "Easy 30-day return policy. Items must be unused with original packaging.",
    },
    {
      id: 2,
      title: "Packaging",
      icon: <FiBox className={styles.icon} />,
      content:
        "All items are carefully packaged to prevent damage during shipping.",
    },
    {
      id: 3,
      title: "Security",
      icon: <FiShield className={styles.icon} />,
      content: "Secure checkout and privacy protection guaranteed.",
    },
  ];

  return (
    <div className={styles.shippingContainer}>
      <h2 className={styles.sectionTitle}>Shipping Information</h2>

      <div className={styles.shippingOptions}>
        {shippingOptions.map((option) => (
          <div key={option.id} className={styles.optionCard}>
            <div className={styles.optionHeader}>
              <div className={styles.optionIcon}>{option.icon}</div>
              <h3 className={styles.optionTitle}>{option.title}</h3>
            </div>
            <div className={styles.optionDetails}>
              <p className={styles.optionPrice}>{option.price}</p>
              <p className={styles.optionTime}>{option.time}</p>
              <p className={styles.optionDescription}>{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.deliveryInfo}>
        <h3 className={styles.subtitle}>Delivery Details</h3>
        <ul className={styles.infoList}>
          <li>Orders typically process within 24 hours</li>
          <li>Tracking information provided for all shipments</li>
          <li>Weekend deliveries available in select areas</li>
          <li>Signature may be required for high-value items</li>
        </ul>
      </div>

      <div className={styles.policiesSection}>
        <h3 className={styles.subtitle}>Our Policies</h3>
        <div className={styles.policiesGrid}>
          {policies.map((policy) => (
            <div key={policy.id} className={styles.policyCard}>
              <div className={styles.policyIcon}>{policy.icon}</div>
              <h4 className={styles.policyTitle}>{policy.title}</h4>
              <p className={styles.policyContent}>{policy.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.faqSection}>
        <h3 className={styles.subtitle}>Shipping FAQs</h3>
        <div className={styles.faqItem}>
          <h4 className={styles.faqQuestion}>Do you ship internationally?</h4>
          <p className={styles.faqAnswer}>
            Yes, we ship to over 50 countries worldwide. International shipping
            rates and delivery times vary by destination.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h4 className={styles.faqQuestion}>
            What if my package is lost or damaged?
          </h4>
          <p className={styles.faqAnswer}>
            Contact us immediately and we'll work with the carrier to resolve
            the issue or send a replacement.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h4 className={styles.faqQuestion}>
            Can I change my shipping address after ordering?
          </h4>
          <p className={styles.faqAnswer}>
            Address changes must be made within 1 hour of placing your order.
            Contact customer support for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
