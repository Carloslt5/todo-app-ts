export interface UserData {
  _id: string
  firstName: string
  lastName: string
}

export interface AuthContextType {
  user: UserData | null
  isLoading: boolean
  storeToken: (token: string) => void
  authenticateUser: () => Promise<void>
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
}
