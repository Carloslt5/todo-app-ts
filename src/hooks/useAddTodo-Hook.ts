import { ToDoContext } from '@/contexts/todo.context'
import { ToDoContextType } from '@/interfaces/ToDoContext.types'
import { TodoData } from '@/interfaces/Todo.type'
import { ValidationError } from '@/interfaces/ValidationError.type'
import todoservices from '@/services/ToDo.services'
import { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useAddTodo = (ticketID: string) => {
  const { id: userID } = useParams()
  const { addTodo } = useContext(ToDoContext) as ToDoContextType

  const todoForm = useForm<TodoData>({
    defaultValues: {
      title: '',
    },
  })

  const { register, handleSubmit } = todoForm
  const [newTicketErrors, setNewTicketrrors] = useState<ValidationError[]>([])

  const todoSubmithandler = async (newTodo: TodoData) => {
    try {
      const { data } = await todoservices.createToDo(userID!, newTodo, ticketID!)
      addTodo(userID!, data, ticketID!)
      setNewTicketrrors([])
      todoForm.setValue('title', '')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404 || error.response?.status === 422) {
          toast.error(error.response?.data.message)
        }
        setNewTicketrrors(error.response?.data)
      }
    }
  }

  return {
    register,
    handleSubmit,
    newTicketErrors,
    todoSubmithandler,
  }
}
