// components/PaystackPaymentButton.tsx
import { PaystackButton } from "react-paystack";
import { useState } from "react";
import { FiCreditCard, FiLoader } from "react-icons/fi";

interface PaystackSuccessResponse {
  reference: string;
  // You can add more fields if needed
}

interface Props {
  email: string;
  amount: number;
  onSuccess: (reference: PaystackSuccessResponse) => void;
  onClose: () => void;
  className?: string;
}

const PaystackPaymentButton = ({
  email,
  amount,
  onSuccess,
  onClose,
  className = "",
}: Props) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY!;
  const currency = import.meta.env.VITE_PAYSTACK_CURRENCY || "GHS";
  const [isProcessing, setIsProcessing] = useState(false);

  const reference = `gh_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const componentProps = {
    email,
    amount: Math.round(amount * 100), // Convert to pesewas
    currency,
    metadata: {
      custom_fields: [
        {
          display_name: "Country",
          variable_name: "country",
          value: "GH",
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (response: PaystackSuccessResponse) => {
      setIsProcessing(false);
      console.log("Paystack response:", response);
      onSuccess(response);
    },
    onClose: () => {
      setIsProcessing(false);
      console.log("Payment closed");
      onClose();
    },
    reference,
    channels: ["card", "mobile_money"],
  };

  const handleClick = () => {
    setIsProcessing(true);
  };

  return (
    <div className={`paystack-button ${className}`}>
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={`payment-button ${isProcessing ? "processing" : ""}`}
      >
        {isProcessing ? (
          <>
            <FiLoader className="animate-spin" />
            <span>Processing Payment</span>
          </>
        ) : (
          <>
            <FiCreditCard />
            <span>Pay ₵{amount.toFixed(2)}</span>
          </>
        )}
      </button>

      {/* Hidden Paystack button that we trigger programmatically */}
      <div className="hidden">
        <PaystackButton {...componentProps} />
      </div>

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

        .payment-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .payment-button.processing {
          background: linear-gradient(135deg, #6c757d 0%, #5c636a 100%);
          cursor: not-allowed;
        }

        .payment-button:disabled {
          opacity: 0.7;
        }

        .hidden {
          display: none;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PaystackPaymentButton;
