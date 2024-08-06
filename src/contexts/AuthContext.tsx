import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";

interface User {
  id: number;
  email: string;
  password: string;
}

interface State {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends State {
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

type Action = { type: "login"; payload: User } | { type: "logout" };

function reducer(state: State, action: Action): State {
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
  id: 1,
  email: "teste@gmail.com",
  password: "123456",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  const login = (email: string, password: string) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      dispatch({ type: "login", payload: MOCK_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
