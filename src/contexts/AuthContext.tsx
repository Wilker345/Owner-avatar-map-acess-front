import React, { createContext, useContext, useReducer } from "react";
import api from "@/utils/axios";

interface User {
    id: number;
    email: string;
    password: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => void;
    register: (email: string, password: string, phone_number: string, user_groups: { id: number, text: string }[]) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

type Action = 
    | { type: "login"; payload: User }
    | { type: "logout" };

function reducer(state: AuthState, action: Action): AuthState {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, user: null, isAuthenticated: false };
        default:
            throw new Error("Unknown action");
    }
}

const MOCK_USER: User = {
    id: 3,
    email: "t3es11t32e21e@gmail.com",
    password: "P@ssw0rd"
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    const login = (email: string, password: string) => {
        if (email === MOCK_USER.email && password === MOCK_USER.password) {
            dispatch({ type: "login", payload: MOCK_USER });
        }
    };

    const register = async (email: string, password: string, phone_number: string, user_groups: { id: number, text: string }[]) => {
        try {
            await api.post('/users', {
                email,
                password,
                phone_number,
                user_groups,
            });
        } catch (error) {
            console.error("Erro ao registrar", error);
        }
    };

    const logout = () => {
        dispatch({ type: "logout" });
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
