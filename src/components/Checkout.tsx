// src/pages/Checkout.tsx
import PaystackPaymentButton from "./PaystackCheckout";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail") || "customer@example.com"; // Replace with dynamic user email
  const amount = 80; // Total cart amount in Ghana cedis

  const handleSuccess = () => {
    // Optional: You can POST reference to your Django backend for verification
    alert("✅ Payment successful!");
    navigate("/thank-you");
  };

  const handleClose = () => {
    alert("❌ Payment popup closed.");
  };

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      <p>Total: ₵{amount}</p>

      <PaystackPaymentButton
        email={email}
        amount={amount}
        onSuccess={handleSuccess}
        onClose={handleClose}
      />
    </div>
  );
};

export default Checkout;
