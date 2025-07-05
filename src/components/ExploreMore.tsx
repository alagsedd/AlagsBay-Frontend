import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import styles from "../styles/ExploreMore.module.css";
import { FiArrowRight, FiShoppingCart, FiEye } from "react-icons/fi";
import { useContext, useState } from "react";
import CartCountContext from "../state-management/contexts/cartCountContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface AddCartProps {
  productId: number;
  quantity: number;
}

interface CartResponse {
  id: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/store";

const ExploreMore = () => {
  const [addingProductId, setAddingProductId] = useState<number | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { cartCountDispatch } = useContext(CartCountContext);

  const cartAction = useMutation({
    mutationFn: async (cartObject: AddCartProps) => {
      let cartId = localStorage.getItem("cartId");

      if (!cartId) {
        const cartResponse = await axios.post<CartResponse>(
          `${API_BASE_URL}/carts/`
        );
        cartId = cartResponse.data.id;
        if (!cartId) throw new Error("Failed to get cart ID");
        localStorage.setItem("cartId", cartId);
      }

      const response = await axios.post(
        `${API_BASE_URL}/carts/${cartId}/items/`,
        {
          product_id: cartObject.productId,
          quantity: cartObject.quantity,
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      cartCountDispatch({ type: "ADD" });
      console.log("Item added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding item:", error);
    },
    onSettled: () => {
      setAddingProductId(null);
    },
  });

  const { data: products, error, isLoading } = useProducts();

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p>Error loading products</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );

  return (
    <section className={styles.exploreMore}>
      <div className={styles.header}>
        <h2 className={styles.title}>Discover More Products</h2>
        <Link to="/products" className={styles.viewAll}>
          Browse All Products
          <FiArrowRight className={styles.arrowIcon} />
        </Link>
      </div>

      <div className={styles.grid}>
        {products?.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className={styles.imageContainer}>
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.images[0]?.image || "/placeholder-product.jpg"}
                  alt={product.title}
                  className={styles.image}
                  loading="lazy"
                />
              </Link>

              {hoveredProduct === product.id && (
                <div className={styles.actionButtons}>
                  <Link
                    to={`/products/${product.id}`}
                    className={styles.quickView}
                    title="Quick View"
                  >
                    <FiEye size={18} />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAddingProductId(product.id);
                      cartAction.mutate({
                        productId: product.id,
                        quantity: 1,
                      });
                    }}
                    className={styles.addToCart}
                    disabled={addingProductId === product.id}
                    title="Add to Cart"
                  >
                    <FiShoppingCart size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className={styles.productInfo}>
              <Link
                to={`/products/${product.id}`}
                className={styles.productTitle}
              >
                {product.title}
              </Link>
              <div className={styles.priceContainer}>
                <span className={styles.price}>
                  ${product.unit_price.toFixed(2)}
                </span>
                {product.unit_price && (
                  <span className={styles.originalPrice}>
                    ${product.unit_price.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setAddingProductId(product.id);
                  cartAction.mutate({
                    productId: product.id,
                    quantity: 1,
                  });
                }}
                className={styles.mobileAddToCart}
                disabled={addingProductId === product.id}
              >
                {addingProductId === product.id ? (
                  <span>Adding...</span>
                ) : (
                  <>
                    <FiShoppingCart className={styles.cartIcon} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreMore;
