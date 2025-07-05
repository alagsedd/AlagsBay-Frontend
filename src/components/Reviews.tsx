import styles from "../styles/Reviews.module.css";
import { FiStar, FiUser } from "react-icons/fi";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      user: "Alex Johnson",
      rating: 5,
      date: "2023-10-15",
      comment:
        "Absolutely love this product! The quality exceeded my expectations and it arrived sooner than expected. Will definitely purchase again.",
      verified: true,
    },
    {
      id: 2,
      user: "Sam Wilson",
      rating: 4,
      date: "2023-09-28",
      comment:
        "Great product overall, but the color was slightly different than shown in the pictures. Still very satisfied with my purchase.",
      verified: true,
    },
    {
      id: 3,
      user: "Taylor Smith",
      rating: 3,
      date: "2023-08-10",
      comment:
        "It's okay for the price. Not the best quality but gets the job done. The shipping took longer than expected.",
      verified: false,
    },
  ];

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const reviewCount = reviews.length;

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h2>Customer Reviews</h2>
        <div className={styles.ratingSummary}>
          <div className={styles.averageRating}>
            <span>{averageRating.toFixed(1)}</span>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={
                    i < Math.floor(averageRating)
                      ? styles.filledStar
                      : styles.emptyStar
                  }
                />
              ))}
            </div>
          </div>
          <p className={styles.reviewCount}>{reviewCount} reviews</p>
        </div>
      </div>

      <div className={styles.reviewForm}>
        <h3>Write a Review</h3>
        <div className={styles.ratingInput}>
          <p>Your Rating:</p>
          <div className={styles.starInput}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar key={star} className={styles.star} />
            ))}
          </div>
        </div>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="review-comment">Your Review</label>
            <textarea
              id="review-comment"
              rows={5}
              placeholder="Share your thoughts about this product..."
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>

      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.userAvatar}>
                <FiUser />
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{review.user}</p>
                <div className={styles.reviewMeta}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < review.rating
                            ? styles.filledStar
                            : styles.emptyStar
                        }
                      />
                    ))}
                  </div>
                  <span className={styles.reviewDate}>{review.date}</span>
                  {review.verified && (
                    <span className={styles.verifiedBadge}>
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.reviewContent}>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
