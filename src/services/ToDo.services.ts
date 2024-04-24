import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { EditedContent } from '../contexts/ticket.context'
import { TodoData } from '../interfaces/Todo.type'

class ToDoServices {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_API_URL,
    })
    this.instance.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem('authToken')

        if (storedToken) {
          config.headers['Authorization'] = `Bearer ${storedToken}`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  getAllToDos(userID: string): Promise<AxiosResponse<TodoData[]>> {
    return this.instance.get(`/todos/${userID}/getAllTodos`)
  }

  getTicketToDos(userID: string, ticketID: string): Promise<AxiosResponse<TodoData[]>> {
    return this.instance.get(`/todos/${userID}/${ticketID}/getTicketToDos`)
  }

  createToDo(userID: string, newTodo: object, ticketID: string): Promise<AxiosResponse<TodoData>> {
    return this.instance.post(`/todos/${userID}/createdTodo`, { newTodo, ticketID })
  }

  updateToDo(userID: string, editedContent: EditedContent): Promise<AxiosResponse<TodoData>> {
    return this.instance.put(`/todos/${userID}/updateTodo`, editedContent)
  }

  updateTitleToDo(userID: string, editedContent: EditedContent): Promise<AxiosResponse<TodoData>> {
    return this.instance.put(`/todos/${userID}/updateTitleToDo`, editedContent)
  }

  deleteToDo(userID: string, todoID: string): Promise<AxiosResponse<TodoData>> {
    return this.instance.delete(`/todos/${userID}/deleteTodo/${todoID}`)
  }

  clearCompleted(userID: string): Promise<AxiosResponse<TodoData>> {
    return this.instance.delete(`/todos/${userID}/deleteCompletedTodos`)
  }

  updateTodoOrder(userID: string, updatedOrder: object[]) {
    return this.instance.put(`/todos/${userID}/updateTodoOrder/`, { updatedOrder })
  }
}

const todoservices = new ToDoServices()
export default todoservices
