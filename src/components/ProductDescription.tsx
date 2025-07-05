import styles from "../styles/ProductDetail.module.css";
import { useParams } from "react-router-dom";
import useProductsDetail from "../hooks/useProductDetail";

const ProductDescription = () => {
  const { id } = useParams();
  console.log(id);

  const productId = Number(id);

  const { data: product, isLoading, error } = useProductsDetail(productId);

  if (isLoading) return <p>Loading description...</p>;
  if (error) return <p>Error loading description.</p>;

  return (
    <div className={styles.tabContent}>
      <h3>Product Details</h3>
      <p>{product?.description}</p>

      <h3>Features</h3>
      <ul>
        <li>High-quality materials</li>
        <li>Eco-friendly production</li>
        <li>1-year manufacturer warranty</li>
      </ul>
    </div>
  );
};

export default ProductDescription;
