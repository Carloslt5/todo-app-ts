import { EditedContent } from '@/contexts/ticket.context'
import { ToDoContextType } from '@/interfaces/ToDoContext.types'
import { TodoData } from '@/interfaces/Todo.type'
import todoservices from '@/services/ToDo.services'
import { AxiosError } from 'axios'
import { ReactNode, createContext, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export const ToDoContext = createContext<ToDoContextType | null>(null)
export function ToDoProviderWrapper({ children }: { children: ReactNode }) {
  const [todoData, setTodoData] = useState<TodoData[] | []>([])
  const [todoDataBackup, setTodoDataBackup] = useState<TodoData[]>(todoData)

  const loadToDos = useCallback(async (userID: string, ticketID: string) => {
    try {
      if (ticketID) {
        const { data } = await todoservices.getTicketToDos(userID, ticketID)
        setTodoData(data)
        setTodoDataBackup(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const addTodo = async (userID: string, todo: TodoData, ticketID: string) => {
    try {
      setTodoData([...(todoData ?? []), todo])
      loadToDos(userID, ticketID)
    } catch (error) {
      console.log(error)
    }
  }

  const updateToDo = async (userID: string, editedContent: EditedContent, ticketID: string) => {
    try {
      await todoservices.updateToDo(userID, editedContent)
      loadToDos(userID, ticketID)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteToDo = async (userID: string, todoID: string, ticketID: string) => {
    try {
      await todoservices.deleteToDo(userID, todoID)
      loadToDos(userID, ticketID)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  // const changeFilter = (filter: string) => {
  //   if (todoDataBackup) {
  //     switch (filter) {
  //       case ('All'):
  //         return setTodoDataBackup(todoData)
  //       case ('Active'):
  //         return setTodoDataBackup(todoData!.filter(todo => !todo.completed))
  //       case ('Completed'):
  //         return setTodoDataBackup(todoData!.filter(todo => todo.completed))
  //       default:
  //         return setTodoDataBackup(todoData)
  //     }
  //   }
  // }

  // const clearCompleted = async (id: string) => {
  //   try {
  //     await todoservices.clearCompleted(id)
  //     loadToDos(id)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <ToDoContext.Provider
      value={{
        todoData,
        todoDataBackup,
        setTodoData,
        setTodoDataBackup,
        loadToDos,
        addTodo,
        updateToDo,
        deleteToDo,
        // changeFilter,
        // clearCompleted
      }}
    >
      {children}
    </ToDoContext.Provider>
  )
}
