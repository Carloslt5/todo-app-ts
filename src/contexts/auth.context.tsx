/* eslint-disable react-hooks/exhaustive-deps */
import { AuthContextType, UserData } from '@/interfaces/AuthContext.types'
import authService from '@/services/auth.services'
import { ReactNode, createContext, useEffect, useState } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null)
export function AuthProviderWrapper({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const storeToken = async (token: string) => {
    await localStorage.setItem('authToken', token)
  }

  const removeToken = async () => {
    localStorage.removeItem('authToken')
  }

  const logout = () => {
    setUser(null)
    setIsLoading(false)
    removeToken()
  }

  const authenticateUser = async () => {
    const token = localStorage.getItem('authToken')

    try {
      if (token) {
        const { data } = await authService.verify(token)
        setUser(data)
        setIsLoading(false)
      } else {
        logout()
      }
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  const value = { user, isLoading, setUser, authenticateUser, storeToken, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider >
  )
}
