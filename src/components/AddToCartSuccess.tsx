import { useEffect, useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import styles from "../styles/AddToCartSuccess.module.css";

interface AddToCartSuccessProps {
  productName?: string;
  onClose?: () => void;
  autoCloseDelay?: number; // in milliseconds
}

const AddToCartSuccess = ({
  productName = "Item",
  onClose,
  autoCloseDelay = 3000,
}: AddToCartSuccessProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoCloseDelay) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300); // Match the CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <FiCheckCircle className={styles.icon} />
        <div className={styles.message}>
          <strong>{productName}</strong> added to cart successfully!
        </div>
      </div>
      <button onClick={handleClose} className={styles.closeButton}>
        <FiX />
      </button>
      <div
        className={styles.progressBar}
        style={{
          animationDuration: `${autoCloseDelay}ms`,
        }}
      />
    </div>
  );
};

export default AddToCartSuccess;
