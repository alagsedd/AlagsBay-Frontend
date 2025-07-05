import { useParams, useNavigate } from "react-router-dom";
import useProductsDetail from "../hooks/useProductDetail";
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft } from "react-icons/fi";
import styles from "../styles/ProductDetail.module.css";
import useAddCart from "../hooks/useAddCart";
import { useState } from "react";
import AddToCartSuccess from "../components/AddToCartSuccess";
import PaystackPaymentButton from "../components/PaystackCheckout";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const {
    data: productDetail,
    error,
    isLoading,
  } = useProductsDetail(Number(id));

  const handlePaymentSuccess = () => {
    // Optional: You can POST reference to your Django backend for verification
    alert("✅ Payment successful!");
    navigate("/thank-you");
  };

  const handlePaymentClose = () => {
    alert("❌ Payment popup closed.");
  };

  const handleOnAddSuccess = () => {
    setShowSuccessCard(true);
    setQuantity(1);
  };

  const addToCart = useAddCart(handleOnAddSuccess);

  const handleCartAction = (productId: number) => {
    addToCart.mutate({
      product_id: productId,
      quantity: quantity,
    });
  };

  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <>
      {showSuccessCard && (
        <AddToCartSuccess
          productName={productDetail?.title}
          onClose={() => setShowSuccessCard(false)}
        />
      )}
      <div className={styles.container}>
        <div className={styles.backButton}>
          <FiChevronLeft /> Back to Products
        </div>

        <div className={styles.productContainer}>
          {/* Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImage}>
              <img
                src={
                  productDetail?.images[0]?.image || "/placeholder-product.jpg"
                }
                alt={productDetail?.title}
              />
            </div>
            <div className={styles.thumbnailContainer}>
              {productDetail?.images.map((img, index) => (
                <div key={index} className={styles.thumbnail}>
                  <img
                    src={img.image}
                    alt={`${productDetail.title} ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.productInfo}>
            <h1 className={styles.title}>{productDetail?.title}</h1>

            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={i < 4 ? styles.filledStar : styles.emptyStar}
                />
              ))}
              <span>(24 reviews)</span>
            </div>

            <p className={styles.price}>
              ₵{productDetail?.unit_price.toFixed(2)} // ✅ Correct for Ghana
            </p>

            <div className={styles.description}>
              <h3>Description</h3>
              <p>{productDetail?.description}</p>
            </div>

            <div className={styles.inventory}>
              {productDetail!.inventory > 0 ? (
                <span className={styles.inStock}>
                  In Stock ({productDetail?.inventory} available)
                </span>
              ) : (
                <span className={styles.outOfStock}>Out of Stock</span>
              )}
            </div>

            <div className={styles.actions}>
              <div className={styles.quantitySelector}>
                <button
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button
                disabled={quantity === 0}
                onClick={() => handleCartAction(productDetail!.id)}
                className={styles.addToCart}
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button className={styles.wishlist}>
                <FiHeart /> Wishlist
              </button>

              {/* Paystack Payment Button - Matching Checkout style */}
              <div className={styles.paymentSection}>
                <p className={styles.totalPrice}>
                  Total: ₵{(productDetail?.unit_price || 0) * quantity}
                </p>
                <PaystackPaymentButton
                  email={userEmail}
                  amount={(productDetail?.unit_price || 0) * quantity}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentClose}
                  // disabled={productDetail?.inventory === 0}
                />
              </div>
            </div>

            <div className={styles.meta}>
              <div>
                <strong>Collection:</strong> {productDetail?.collection}
              </div>
              <div>
                <strong>SKU:</strong> PRD-{id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
