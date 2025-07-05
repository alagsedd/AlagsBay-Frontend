import styles from "../styles/Collections.module.css";
import electronicsImg from "../assets/images/categories/electronics.png";
import clothingImg from "../assets/images/categories/clothing.png";
import homeImg from "../assets/images/categories/furniture.png";
import beautyImg from "../assets/images/categories/beauty.png";
import sportsImg from "../assets/images/categories/sports.png";
import booksImg from "../assets/images/categories/books.png";
import useCollections from "../hooks/useCollections";
import React from "react";
import { Link } from "react-router-dom";

const Collections = () => {
  const { data } = useCollections();

  console.log(data);

  const categories = [
    {
      id: 1,
      title: "Electronics",
      image: electronicsImg,
      items: "1,200+ products",
    },
    {
      id: 2,
      title: "Clothing",
      image: clothingImg,
      items: "850+ styles",
    },
    {
      id: 3,
      title: "Home & Living",
      image: homeImg,
      items: "600+ items",
    },
    {
      id: 4,
      title: "Beauty",
      image: beautyImg,
      items: "400+ products",
    },
    {
      id: 5,
      title: "Sports",
      image: sportsImg,
      items: "300+ items",
    },
    {
      id: 6,
      title: "Books",
      image: booksImg,
      items: "1,500+ titles",
    },
  ];

  return (
    <section className={styles.collections}>
      <h2 className={styles.sectionTitle}>Shop by Category</h2>
      <div className={styles.grid}>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <Link to={"/#"}>
              <div key={category.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={category.image}
                    alt={category.title}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{category.title}</h3>
                  <p className={styles.itemCount}>{category.items}</p>
                </div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Collections;
