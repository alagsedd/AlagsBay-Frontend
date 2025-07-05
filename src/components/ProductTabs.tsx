import { Link, useLocation, useParams } from "react-router-dom";
import styles from "../styles/ProductTabs.module.css";

const ProductTabs = () => {
  const { id } = useParams();
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTab = (path: string) => {
    if (path === "description") return location.pathname === `/products/${id}`;
    return location.pathname.includes(path);
  };

  const tabs = [
    { id: 1, path: ".", label: "Description" },
    { id: 2, path: "reviews", label: "Reviews" },
    { id: 3, path: "shipping", label: "Shipping" },
  ];

  return (
    <div className={styles.tabsContainer}>
      <nav className={styles.tabsNav}>
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`${styles.tabLink} ${
              getActiveTab(tab.path === "." ? "description" : tab.path)
                ? styles.activeTab
                : ""
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ProductTabs;
