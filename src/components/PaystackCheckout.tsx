// components/PaystackPaymentButton.tsx
import { useState } from "react";
import { FiCreditCard, FiLoader } from "react-icons/fi";

interface Props {
  email: string;
  amount: number; // In Ghana cedis
  onSuccess: (reference: string) => void;
  onClose: () => void;
  className?: string;
}

// Extend the window interface for PaystackPop
declare global {
  interface Window {
    PaystackPop: {
      setup(config: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        reference?: string;
        onClose?: () => void;
        callback: (response: { reference: string }) => void;
      }): { openIframe: () => void };
    };
  }
}

const PaystackPaymentButton = ({
  email,
  amount,
  onSuccess,
  onClose,
  className = "",
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(amount * 100), // Convert to pesewas
      currency: import.meta.env.VITE_PAYSTACK_CURRENCY || "GHS",
      reference: `GH_${Date.now()}`,
      onClose: () => {
        setIsProcessing(false);
        onClose();
      },
      callback: (response: { reference: string }) => {
        setIsProcessing(false);
        console.log("Payment response:", response);
        onSuccess(response.reference);
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className={`payment-button ${className} ${
        isProcessing ? "processing" : ""
      }`}
    >
      {isProcessing ? (
        <>
          <FiLoader className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <FiCreditCard />
          <span>Pay ₵{amount.toFixed(2)}</span>
        </>
      )}

      <style>{`
        .payment-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #0d6dfd 0%, #0b5ed7 100%);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 300px;
        }

        .payment-button:hover {
          background: linear-gradient(135deg, #0b5ed7 0%, #0a58ca 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .payment-button:disabled,
        .payment-button.processing {
          background: linear-gradient(135deg, #6c757d 0%, #5c636a 100%);
          cursor: not-allowed;
          opacity: 0.8;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </button>
  );
};

export default PaystackPaymentButton;
