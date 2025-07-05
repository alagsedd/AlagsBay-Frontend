import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaystackPaymentButton from "../components/PaystackCheckout";
import useCartDetail from "../hooks/useCartDetail";
import { FiArrowLeft } from "react-icons/fi";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartId = Number(localStorage.getItem("cartId")); // Get cartId from localStorage
  const {
    data: cart,
    isLoading: isCartLoading,
    error: cartError,
  } = useCartDetail(cartId); // Pass cartId to hook
  const [email, setEmail] = useState("");
  //   const [isProcessing, setIsProcessing] = useState(false);

  const handleSuccess = (reference: string) => {
    console.log("Payment successful", reference);
    navigate("/thank-you", { state: { reference } });
  };

  const handleClose = () => {
    console.log("Payment closed");
    // setIsProcessing(false);
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  if (isCartLoading) return <div>Loading cart details...</div>;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;
  if (!cart) return <div>No cart found</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={handleBackToCart}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800"
      >
        <FiArrowLeft /> Back to Cart
      </button>

      <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="your@email.com"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          We'll send your receipt to this email
        </p>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount:</span>
          <span className="text-xl font-bold">
            ₵{cart.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {email ? (
        <PaystackPaymentButton
          email={email}
          amount={cart.totalPrice}
          onSuccess={handleSuccess}
          onClose={handleClose}
          //   disabled={isProcessing}
        />
      ) : (
        <button
          disabled
          className="w-full py-3 px-4 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
        >
          Enter your email to continue
        </button>
      )}
    </div>
  );
};

export default CheckoutPage;
