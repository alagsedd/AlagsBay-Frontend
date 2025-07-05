import { useContext, useState } from "react";
import styles from "../styles/Cart.module.css";
import { FiPlus, FiMinus, FiX, FiShoppingCart } from "react-icons/fi";
import useCartItems from "../hooks/useCartItems";
import CartCountContext from "../state-management/contexts/cartCountContext";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const Cart = () => {
  const { count } = useContext(CartCountContext);
  const cartId = localStorage.getItem("cartId");
  const { data: cartItems, error, isLoading, refetch } = useCartItems(cartId);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cartId) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.cartContent}>
          <div className={styles.emptyCart}>
            <FiShoppingCart size={48} className={styles.emptyCartIcon} />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items yet</p>
            <Link to="/products" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mutation for updating item quantity
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const updateQuantity = useMutation({
    mutationFn: async ({
      itemId,
      newQuantity,
    }: {
      itemId: number;
      newQuantity: number;
    }) => {
      if (newQuantity < 1) return;
      await apiClient.patch(`/store/carts/${cartId}/items/${itemId}/`, {
        quantity: newQuantity,
      });
    },
    onSuccess: () => refetch(),
  });

  // Mutation for removing item
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const removeItem = useMutation({
    mutationFn: async (itemId: number) => {
      await apiClient.delete(`/store/carts/${cartId}/items/${itemId}/`);
    },
    onSuccess: () => {
      refetch();
      setCount((prev) => prev - 1);
    },
  });

  // Calculate cart totals
  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + item.product.unit_price * item.quantity,
      0
    ) ?? 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Add your checkout logic here
  };

  if (isLoading)
    return <div className={styles.loading}>Loading your cart...</div>;
  if (error)
    return <div className={styles.error}>Failed to load cart items.</div>;

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2>Your Cart ({cartItems?.length || 0})</h2>
        </div>

        {count === 0 ? (
          <div className={styles.emptyCart}>
            <FiShoppingCart size={48} className={styles.emptyCartIcon} />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items yet</p>
            <Link to="/products" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cartItems?.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageContainer}>
                    <img
                      src={`http://127.0.0.1:8000${item.product.images[0]?.image}`}
                      alt={item.product.title}
                      className={styles.itemImage}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.product.title}</h3>
                    <p className={styles.itemPrice}>
                      ${item.product.unit_price.toFixed(2)}
                    </p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          updateQuantity.mutate({
                            itemId: item.id,
                            newQuantity: item.quantity - 1,
                          })
                        }
                        disabled={
                          item.quantity <= 1 || updateQuantity.isPending
                        }
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity.mutate({
                            itemId: item.id,
                            newQuantity: item.quantity + 1,
                          })
                        }
                        disabled={updateQuantity.isPending}
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemSubtotal}>
                    ${(item.product.unit_price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className={styles.removeItem}
                    onClick={() => removeItem.mutate(item.id)}
                    disabled={removeItem.isPending}
                    aria-label="Remove item"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h3>Order Summary</h3>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.cartActions}>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </button>
              <Link to="/products" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
