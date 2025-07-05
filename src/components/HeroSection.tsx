import styles from "../styles/HeroSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import your images
import samsung from "../assets/images/samsung phone.png";
import nike from "../assets/images/nike  jordan.jpg";
import chair from "../assets/images/chair.jpg";
import airpods from "../assets/images/airpods.jpg";
import macbook from "../assets/images/macbook.jpg";
import jbl from "../assets/images/jbl.jpeg";

const HeroSection = () => {
  const products = [
    {
      id: 1,
      image: samsung,
      title: "Samsung Galaxy S24 Ultra",
      subtitle: "12GB RAM • Titanium Gray",
      price: "₵5,999",
      oldPrice: "₵6,499",
      rating: 4.8,
      tag: "New Release",
    },
    {
      id: 2,
      image: nike,
      title: "Nike Jordan Brooklyn Fleece",
      subtitle: "Men's Pullover Hoodie",
      price: "₵299",
      oldPrice: "₵399",
      rating: 4.6,
      tag: "Trending",
    },
    {
      id: 3,
      image: chair,
      title: "Beanless Bag Chair",
      subtitle: "Inflatable Lounge Chair • Grey",
      price: "₵149",
      oldPrice: "₵199",
      rating: 4.4,
      tag: "Comfort",
    },
    {
      id: 4,
      image: airpods,
      title: "AirPods Pro (2nd Gen)",
      subtitle: "Active Noise Cancellation",
      price: "₵1,299",
      oldPrice: "₵1,499",
      rating: 4.7,
      tag: "Best Seller",
    },
    {
      id: 5,
      image: macbook,
      title: "MacBook Pro M3",
      subtitle: "14-inch • 16GB RAM • 512GB SSD",
      price: "₵8,999",
      oldPrice: "₵9,499",
      rating: 4.9,
      tag: "Premium",
    },
    {
      id: 6,
      image: jbl,
      title: "JBL Flip 6",
      subtitle: "Portable Bluetooth Speaker",
      price: "₵599",
      oldPrice: "₵699",
      rating: 4.5,
      tag: "Audio",
    },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.header}>
        <h2 className={styles.title}>Today's Featured Products</h2>
        <p className={styles.subtitle}>
          Discover our best deals and newest arrivals
        </p>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className={styles.swiper}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className={styles.productCard}>
              {product.tag && <span className={styles.tag}>{product.tag}</span>}
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
                <p className={styles.productSubtitle}>{product.subtitle}</p>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>{product.price}</span>
                  {product.oldPrice && (
                    <span className={styles.oldPrice}>{product.oldPrice}</span>
                  )}
                </div>

                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product.rating) ? styles.filled : ""
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={styles.ratingValue}>
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                <button className={styles.ctaButton}>
                  <span>Shop Now</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
