import { TodoData } from '@/interfaces/Todo.type'
import { EditedContent } from '../contexts/ticket.context'

export interface ToDoContextType {
  todoData: TodoData[] | []
  setTodoData: React.Dispatch<React.SetStateAction<TodoData[] | []>>
  todoDataBackup: TodoData[]
  setTodoDataBackup: React.Dispatch<React.SetStateAction<TodoData[] | []>>

  loadToDos: (userID: string, ticketID: string) => Promise<void>
  addTodo: (userID: string, todo: TodoData, ticketID: string) => Promise<void>

  updateToDo: (userID: string, editedContent: EditedContent, ticketID: string) => Promise<void>
  deleteToDo: (userID: string, todoID: string, ticketID: string) => Promise<void>

  // changeFilter: (filter: string) => void
  // clearCompleted: (id: string) => Promise<void>
}
