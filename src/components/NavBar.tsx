import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CartCountContext from "../state-management/contexts/cartCountContext";
import AuthContext from "../state-management/contexts/authContext";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import styles from "../styles/Navbar.module.css";

const NavBar = () => {
  const { count } = useContext(CartCountContext);
  const { authState, authStateDispatch } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  const handleLogout = () => {
    authStateDispatch({ type: "LOGOUT" });
    [
      "accessToken",
      "refreshToken",
      "loginCredentials",
      "cartCount",
      "cartId",
    ].forEach((item) => localStorage.removeItem(item));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest(`.${styles.mobileMenu}`)) {
        toggleMenu();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.topBar}>
        <p>Free shipping on orders over ₵200</p>
      </div>

      <nav className={styles.nav}>
        <div className={styles.container}>
          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="AlagsBay Home">
            <span>Alags</span>
            <span className={styles.logoHighlight}>Bay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            <div className={styles.navItem}>
              <Link to="/products" className={styles.navLink}>
                Shop <FiChevronDown className={styles.dropdownIcon} />
              </Link>
              <div className={styles.dropdownMenu}>
                <Link to="/products/new" className={styles.dropdownLink}>
                  New Arrivals
                </Link>
                <Link
                  to="/products/bestsellers"
                  className={styles.dropdownLink}
                >
                  Bestsellers
                </Link>
                <Link to="/products/deals" className={styles.dropdownLink}>
                  Deals
                </Link>
              </div>
            </div>
            <Link to="/categories" className={styles.navLink}>
              Categories
            </Link>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search products"
            />
          </div>

          {/* User Actions */}
          <div className={styles.userActions}>
            {authState.isAuthenticated ? (
              <div className={styles.userDropdown}>
                <button className={styles.userButton} aria-label="User menu">
                  <FiUser className={styles.userIcon} />
                  <span>
                    Hi, {authState.loginCredentials?.username.split(" ")[0]}
                  </span>
                </button>
                <div className={styles.userDropdownMenu}>
                  <Link to="/user-account" className={styles.userDropdownLink}>
                    My Account
                  </Link>
                  <Link to="/orders" className={styles.userDropdownLink}>
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles.userDropdownLink}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/sign-in" className={styles.authButton}>
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className={`${styles.authButton} ${styles.primary}`}
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/cart"
              className={styles.cartButton}
              aria-label={`Cart (${count} items)`}
            >
              <FiShoppingCart />
              {count > 0 && <span className={styles.cartBadge}>{count}</span>}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={styles.mobileSearch}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <div className={styles.mobileMenuContent}>
            {authState.isAuthenticated ? (
              <div className={styles.mobileUser}>
                <FiUser size={20} />
                <span>{authState.loginCredentials?.username}</span>
              </div>
            ) : (
              <div className={styles.mobileAuth}>
                <Link
                  to="/sign-in"
                  className={styles.mobileAuthButton}
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className={`${styles.mobileAuthButton} ${styles.primary}`}
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <div className={styles.mobileNavLinks}>
              <Link
                to="/products"
                className={styles.mobileLink}
                onClick={toggleMenu}
              >
                Shop All
              </Link>
              <Link
                to="/categories"
                className={styles.mobileLink}
                onClick={toggleMenu}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className={styles.mobileLink}
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                to="/cart"
                className={styles.mobileLink}
                onClick={toggleMenu}
              >
                My Cart {count > 0 && <span>({count})</span>}
              </Link>

              {authState.isAuthenticated && (
                <>
                  <Link
                    to="/user-account"
                    className={styles.mobileLink}
                    onClick={toggleMenu}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className={styles.mobileLink}
                    onClick={toggleMenu}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className={styles.mobileLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className={styles.overlay}
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
};

export default NavBar;
