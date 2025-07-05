import styles from "../styles/HeroSection.module.css";
import { useEffect, useRef, useState } from "react";

import samsung from "../assets/images/samsung phone.png";
import nike from "../assets/images/nike  jordan.jpg";
import chair from "../assets/images/chair.jpg";
import airpods from "../assets/images/airpods.jpg";
import macbook from "../assets/images/macbook.jpg";
import jbl from "../assets/images/jbl.jpeg";

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
    bgColor: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
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
    bgColor: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
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
    bgColor: "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)",
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
    bgColor: "linear-gradient(135deg, #f0f2f0 0%, #000c40 100%)",
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
    bgColor: "linear-gradient(135deg, #2c3e50 0%, #bdc3c7 100%)",
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
    bgColor: "linear-gradient(135deg, #3a1c71 0%, #ffaf7b 100%)",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate slides with pause on hover
  // Auto-rotate slides with pause on hover
  useEffect(() => {
    if (!isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Featured</span> Products
          </h2>
          <p className={styles.subtitle}>
            Curated selection of this week's hottest items
          </p>
          <div className={styles.controls}>
            <button
              className={styles.controlButton}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>
            <button
              className={styles.controlButton}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div
        className={styles.carouselContainer}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          ref={carouselRef}
          className={styles.carousel}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.slide}
              style={{ background: product.bgColor }}
            >
              <div className={styles.slideContent}>
                <div className={styles.productInfo}>
                  {product.tag && (
                    <span className={styles.tag}>{product.tag}</span>
                  )}
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productSubtitle}>{product.subtitle}</p>

                  <div className={styles.priceContainer}>
                    <span className={styles.price}>{product.price}</span>
                    {product.oldPrice && (
                      <span className={styles.oldPrice}>
                        {product.oldPrice}
                      </span>
                    )}
                  </div>

                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} filled={i < Math.floor(product.rating)} />
                      ))}
                    </div>
                    <span>{product.rating.toFixed(1)}</span>
                  </div>

                  <button className={styles.ctaButton}>
                    Shop Now <ArrowRight />
                  </button>
                </div>

                <div className={styles.productImage}>
                  <img src={product.image} alt={product.title} loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pagination}>
        {products.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

// SVG Components
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HeroSection;
