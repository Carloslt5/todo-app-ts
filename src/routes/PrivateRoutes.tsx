import Loading from '@/components/Loading/Loading'
import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/interfaces/AuthContext.types'
import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {

  const navigate = useNavigate()
  const { setUser, isLoading } = useContext(AuthContext) as AuthContextType

  useEffect(() => {
    if (!localStorage.authToken) {
      navigate('/')
      setUser(null)
    }
  }, [navigate, setUser])

  if (isLoading) {
    return <Loading />
  }

  return <Outlet />
}

export default PrivateRoutes