import React from "react";
import styles from "../styles/TodayBestDeals.module.css";

import product1 from "../assets/images/bestdeals/headphones.png";
import product2 from "../assets/images/bestdeals/watch.png";
import product3 from "../assets/images/bestdeals/Organic Cotton T-Shirt.png";
import product4 from "../assets/images/bestdeals/jbl.png";
// import product5 from "../assets/images/bestdeals/";
import product5 from "../assets/images/bestdeals/bottle.png";

const TodaysBestDeals = () => {
  const products = [
    {
      id: 1,
      image: product1,
      title: "Wireless Noise-Canceling Headphones",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.7,
    },
    {
      id: 2,
      image: product2,
      title: "Smart Fitness Watch",
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      rating: 4.5,
    },
    {
      id: 3,
      image: product3,
      title: "Organic Cotton T-Shirt",
      price: 24.99,
      originalPrice: 34.99,
      discount: 29,
      rating: 4.3,
    },
    {
      id: 4,
      image: product4,
      title: "Bluetooth Portable Speaker",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.6,
    },
    // {
    //   id: 5,
    //   image: product5,
    //   title: "Wireless Phone Charger",
    //   price: 29.99,
    //   originalPrice: 39.99,
    //   discount: 25,
    //   rating: 4.4,
    // },
    {
      id: 5,
      image: product5,
      title: "Stainless Steel Water Bottle",
      price: 19.99,
      originalPrice: 24.99,
      discount: 20,
      rating: 4.8,
    },
  ];

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.header}>
        <h2 className={styles.title}>Today's Best Deals</h2>
        <button className={styles.viewAll}>View All</button>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.badge}>-{product.discount}%</div>
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.image}
                loading="lazy"
              />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.star} ${
                      i < Math.round(product.rating) ? styles.filled : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className={styles.ratingCount}>({product.rating})</span>
              </div>
              <div className={styles.pricing}>
                <span className={styles.price}>
                  ${product.price.toFixed(2)}
                </span>
                <span className={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
              <button className={styles.addToCart}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysBestDeals;
