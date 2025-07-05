import React  from "react";
import type { AuthAction, AuthState } from "../reducers/authReducer";

interface AuthContextType {
    authState: AuthState
    authStateDispatch: React.ActionDispatch<[action: AuthAction]>
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)
export default AuthContext