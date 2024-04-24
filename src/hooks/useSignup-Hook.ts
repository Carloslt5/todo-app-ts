import { ValidationError } from '@/interfaces/ValidationError.type'
import authservices from '@/services/auth.services'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type SignUpData = {
  firstName: string
  lastName: string
  email: string
  password: string
};

export const useSignup = () => {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const { register, handleSubmit } = form
  const [signUpErrors, setSignUpErrors] = useState<ValidationError[]>([])

  const navigate = useNavigate()

  const submitHandler = async (signUpData: SignUpData) => {
    try {
      await authservices.signup(signUpData)
      navigate('/login')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 422) {
          toast.error(error.response.data.message)
        }
        setSignUpErrors(error.response?.data)
      }
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }
  return {
    form,
    register,
    handleSubmit,
    signUpErrors,
    submitHandler,
  }
}
