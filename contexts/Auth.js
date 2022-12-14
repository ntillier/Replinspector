import { createContext, useContext } from 'react'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children, user }) {
  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  )
}