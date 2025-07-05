import { useState, useRef, useEffect } from "react";
// import { useRouter } from 'next/router';
import styles from "../styles/Search.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  //   const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${styles.searchContainer} ${isFocused ? styles.active : ""}`}
      ref={searchRef}
    >
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="What are you looking for?"
          className={styles.searchInput}
          aria-label="Search products"
        />
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      {isFocused && (
        <div className={styles.recentSearches}>
          <div className={styles.sectionHeader}>Recent Searches</div>
          <div className={styles.searchItems}>
            <button className={styles.searchItem}>Running shoes</button>
            <button className={styles.searchItem}>Wireless headphones</button>
            <button className={styles.searchItem}>Yoga mat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
