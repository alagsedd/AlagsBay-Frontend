interface AuthToken {
    refreshToken: string | null
    accessToken: string | null
}

interface LoginAction {
    type: 'LOGIN'
    token: AuthToken
    loginCredentials: LoginCredentials
}

interface LogoutAction {
    type: 'LOGOUT'

}

interface LoginCredentials {
    username: string
    password: string
}

export interface AuthState {
    token: AuthToken | null
    loginCredentials: LoginCredentials | null
    isAuthenticated: boolean
}

export type AuthAction = LoginAction | LogoutAction

const authReducer = (authState:AuthState, action:AuthAction ):AuthState => {
    if (action.type === 'LOGIN') {
        return {
            token: action.token,
            loginCredentials: action.loginCredentials,
            isAuthenticated: true
    }
        }

    if (action.type === 'LOGOUT') {
        return {
            token: null,
            loginCredentials: null,
            isAuthenticated: false
        }
    }
        return authState
}

export default authReducer