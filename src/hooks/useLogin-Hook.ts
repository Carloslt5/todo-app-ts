import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/interfaces/AuthContext.types'
import { ValidationError } from '@/interfaces/ValidationError.type'
import authservices from '@/services/auth.services'
import { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type LoginData = {
  email: string
  password: string
};

export const useLogin = () => {
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { register, handleSubmit } = loginForm
  const [loginErrors, setLoginErrors] = useState<ValidationError[]>([])

  const { storeToken, authenticateUser } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  const submitHandler = async (loginData: LoginData) => {
    try {
      const { data } = await authservices.login(loginData)
      storeToken(data.authToken)
      authenticateUser()
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          toast.error(error.response.data.message)
        }
        setLoginErrors(error.response?.data)
      }
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }
  return {
    register,
    handleSubmit,
    loginErrors,
    submitHandler,
  }
}
