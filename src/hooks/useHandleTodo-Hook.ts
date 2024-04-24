import { EditedContent } from '@/contexts/ticket.context'
import { ToDoContext } from '@/contexts/todo.context'
import { ToDoContextType } from '@/interfaces/ToDoContext.types'
import { TodoData } from '@/interfaces/Todo.type'
import todoservices from '@/services/ToDo.services'
import { AxiosError } from 'axios'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useHandleTodo = (todo: TodoData, ticketID: string) => {
  const { id: userID } = useParams()
  const { _id: todoID } = todo

  const { loadToDos, updateToDo, deleteToDo } = useContext(ToDoContext) as ToDoContextType

  const handlerUpdateTodo = () => updateToDo(userID!, todo, ticketID)
  const handlerDeleteToDo = () => deleteToDo(userID!, todoID, ticketID)
  const handlerLoadToDos = () => loadToDos(userID!, ticketID)

  const handlerUpdateTitleToDo = async (_id: string, editedContent: EditedContent) => {
    try {
      await todoservices.updateTitleToDo(userID!, editedContent)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  return {
    handlerUpdateTodo,
    handlerDeleteToDo,
    handlerLoadToDos,
    handlerUpdateTitleToDo,
  }
}
