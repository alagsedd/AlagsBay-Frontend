import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useReducer } from "react";
import cartCountReducer from "../state-management/reducers/cartCountReducer";
import CartCountContext from "../state-management/contexts/cartCountContext";
import AuthContext from "../state-management/contexts/authContext";
import authReducer from "../state-management/reducers/authReducer";

const Layout = () => {
  const initialCount = Number(localStorage.getItem("cartCount") || 0);
  const [count, cartCountDispatch] = useReducer(cartCountReducer, initialCount);

  const intialAuthState = {
    token: {
      refreshToken: localStorage.getItem("refreshToken") || null,
      accessToken: localStorage.getItem("accessToken") || null,
    },
    loginCredentials: localStorage.getItem("loginCredentials")
      ? JSON.parse(localStorage.getItem("loginCredentials")!)
      : null,
    isAuthenticated: Boolean(localStorage.getItem("accessToken")),
  };

  const [authState, authStateDispatch] = useReducer(
    authReducer,
    intialAuthState
  );
  console.log(intialAuthState);

  return (
    <div>
      <AuthContext.Provider value={{ authState, authStateDispatch }}>
        {" "}
        <CartCountContext.Provider value={{ count, cartCountDispatch }}>
          <NavBar />
          <Outlet />
        </CartCountContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

export default Layout;
