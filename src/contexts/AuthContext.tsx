import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, user: null, isAuthenticated: false };
        default:
            throw new Error("Unknown action");
    }
}

const MOCK_USER = {
    id: 3,
    email: "t3es11t32e21e@gmail.com",
    password: "P@ssw0rd"
};

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );

    function login(email, password) {
        if (email === MOCK_USER.email && password ===   MOCK_USER.password)
            dispatch({ type: "login", payload: MOCK_USER });
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
