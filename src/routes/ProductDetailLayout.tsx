import { Outlet } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail";
import ProductTabs from "../components/ProductTabs";
import styles from "../styles/ProductDetailLayout.module.css";

const ProductDetailLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <ProductDetail />

      <div className={styles.tabsWrapper}>
        <ProductTabs />
      </div>

      <div className={styles.contentArea}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProductDetailLayout;
