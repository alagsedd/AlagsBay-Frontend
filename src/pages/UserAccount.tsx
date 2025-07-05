import { useContext, useState } from "react";
import {
  FiUser,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiEdit,
  FiLock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "../styles/UserAccount.module.css";
import AuthContext from "../state-management/contexts/authContext";

const UserAccount = () => {
  const {
    authState: { isAuthenticated, loginCredentials },
    authStateDispatch,
  } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Sample data
  // const [user, setUser] = useState({
  //   name: loginCredentials?.username || "Guest User",
  //   email: loginCredentials?.email || "guest@example.com",
  //   phone: "+1 (555) 123-4567",
  //   address: "456 Commerce St, Suite 200, San Francisco, CA 94108",
  //   joinedDate: new Date().toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   }),
  // });

  const orders = [
    {
      id: "ORD-1001",
      date: "2023-10-15",
      total: 149.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-0982",
      date: "2023-09-28",
      total: 89.5,
      status: "Shipped",
      items: 2,
    },
  ];

  const wishlist = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "/products/headphones.jpg",
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "/products/tshirt.jpg",
    },
  ];

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({ ...prev, [name]: value }));
  // };

  const handleLogout = () => {
    authStateDispatch({ type: "LOGOUT" });
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.guestContainer}>
        <div className={styles.guestContent}>
          <div className={styles.guestIllustration}>
            <FiUser className={styles.guestIcon} />
          </div>
          <h2 className={styles.guestTitle}>Welcome, Guest!</h2>
          <p className={styles.guestText}>
            Sign in to view your account details, orders, and wishlist.
          </p>
          <div className={styles.guestActions}>
            <Link to="/sign-in" className={styles.primaryButton}>
              Sign In <FiArrowRight />
            </Link>
            <Link to="/sign-up" className={styles.secondaryButton}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>My Account</h1>
        <span className={styles.memberSince}>
          Member since {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              {loginCredentials?.username.charAt(0).toUpperCase()}
            </div>
            <h3 className={styles.userName}>{loginCredentials?.username}</h3>
            <p className={styles.userEmail}>{"fakeemail@gmail.com"}</p>
          </div>

          <nav className={styles.navMenu}>
            <button
              onClick={() => setActiveTab("profile")}
              className={`${styles.navButton} ${
                activeTab === "profile" ? styles.navButtonActive : ""
              }`}
            >
              <FiUser className={styles.navIcon} /> Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`${styles.navButton} ${
                activeTab === "orders" ? styles.navButtonActive : ""
              }`}
            >
              <FiShoppingBag className={styles.navIcon} /> My Orders
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`${styles.navButton} ${
                activeTab === "wishlist" ? styles.navButtonActive : ""
              }`}
            >
              <FiHeart className={styles.navIcon} /> Wishlist
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`${styles.navButton} ${
                activeTab === "settings" ? styles.navButtonActive : ""
              }`}
            >
              <FiSettings className={styles.navIcon} /> Settings
            </button>
            <button
              onClick={handleLogout}
              className={`${styles.navButton} ${styles.signOutButton}`}
            >
              <FiLogOut className={styles.navIcon} /> Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className={styles.tabContent}>
              <div className={styles.profileHeader}>
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={styles.editButton}
                  >
                    <FiEdit className={styles.editIcon} /> Edit Profile
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button
                      onClick={() => setIsEditing(false)}
                      className={styles.saveButton}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.profileFields}>
                <div className={styles.field}>
                  <FiUser className={styles.fieldIcon} />
                  <div className={styles.fieldContent}>
                    <label className={styles.fieldLabel}>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={loginCredentials?.username}
                        // onChange={handleInputChange}
                        className={styles.fieldInput}
                      />
                    ) : (
                      <span className={styles.fieldValue}>
                        {loginCredentials?.username}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <FiMail className={styles.fieldIcon} />
                  <div className={styles.fieldContent}>
                    <label className={styles.fieldLabel}>Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        // value={user.email}
                        // onChange={handleInputChange}
                        className={styles.fieldInput}
                      />
                    ) : (
                      <span className={styles.fieldValue}>{"user.email"}</span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <FiPhone className={styles.fieldIcon} />
                  <div className={styles.fieldContent}>
                    <label className={styles.fieldLabel}>Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        //fake phone
                        value={"093398383"}
                        // onChange={handleInputChange}
                        className={styles.fieldInput}
                      />
                    ) : (
                      <span className={styles.fieldValue}>{233333987}</span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <FiMapPin className={styles.fieldIcon} />
                  <div className={styles.fieldContent}>
                    <label className={styles.fieldLabel}>
                      Shipping Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        // value={user.address}
                        // onChange={handleInputChange}
                        className={styles.fieldInput}
                        rows={3}
                      />
                    ) : (
                      <span className={styles.fieldValue}>
                        "This Uk fake address
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Order History</h2>

              {orders.length > 0 ? (
                <div className={styles.orderList}>
                  {orders.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <div>
                          <p className={styles.orderId}>Order {order.id}</p>
                          <p className={styles.orderDate}>
                            {order.date} • {order.items} item
                            {order.items > 1 ? "s" : ""}
                          </p>
                        </div>
                        <span
                          className={`${styles.orderStatus} ${
                            styles[`status${order.status}`]
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className={styles.orderFooter}>
                        <p className={styles.orderTotal}>
                          ${order.total.toFixed(2)}
                        </p>
                        <Link
                          to={`/orders/${order.id}`}
                          className={styles.viewDetails}
                        >
                          View Details <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FiShoppingBag className={styles.emptyIcon} />
                  <p className={styles.emptyText}>
                    You haven't placed any orders yet
                  </p>
                  <Link to="/products" className={styles.shopButton}>
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Your Wishlist</h2>

              {wishlist.length > 0 ? (
                <div className={styles.wishlistGrid}>
                  {wishlist.map((item) => (
                    <div key={item.id} className={styles.wishlistItem}>
                      <div className={styles.itemImage}>
                        <img src={item.image} alt={item.name} />
                        <button className={styles.wishlistRemove}>
                          <FiHeart className={styles.heartFilled} />
                        </button>
                      </div>
                      <div className={styles.itemDetails}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <p className={styles.itemPrice}>
                          ${item.price.toFixed(2)}
                        </p>
                        <button className={styles.addToCart}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FiHeart className={styles.emptyIcon} />
                  <p className={styles.emptyText}>Your wishlist is empty</p>
                  <Link to="/products" className={styles.shopButton}>
                    Browse Products
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Account Settings</h2>

              <div className={styles.settingCard}>
                <h3 className={styles.settingTitle}>
                  <FiLock className={styles.settingIcon} /> Change Password
                </h3>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    placeholder="Enter current password"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>New Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    placeholder="Enter new password"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className={styles.formInput}
                    placeholder="Confirm new password"
                  />
                </div>
                <button className={styles.saveButton}>Update Password</button>
              </div>

              <div className={styles.settingCard}>
                <h3 className={styles.settingTitle}>
                  <FiMail className={styles.settingIcon} /> Email Preferences
                </h3>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="promotions"
                    className={styles.checkbox}
                    defaultChecked
                  />
                  <label htmlFor="promotions" className={styles.checkboxLabel}>
                    Promotional offers
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="updates"
                    className={styles.checkbox}
                    defaultChecked
                  />
                  <label htmlFor="updates" className={styles.checkboxLabel}>
                    Product updates
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="notifications"
                    className={styles.checkbox}
                    defaultChecked
                  />
                  <label
                    htmlFor="notifications"
                    className={styles.checkboxLabel}
                  >
                    Order notifications
                  </label>
                </div>
                <button className={styles.saveButton}>Save Preferences</button>
              </div>

              <div className={styles.dangerZone}>
                <h3 className={styles.dangerTitle}>Danger Zone</h3>
                <p className={styles.dangerText}>
                  Deleting your account will remove all your data permanently.
                </p>
                <button className={styles.deleteButton}>Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
