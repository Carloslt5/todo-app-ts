import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { IKanbanBoardData } from '../interfaces/KanbanBoard.type'

class KanbanServices {
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

  getKanbanBoard(): Promise<AxiosResponse<IKanbanBoardData[]>> {
    return this.instance.get('/kanbanboard/getKanbanBoard')
  }

  getOneKanbanBoard(kanbanBoardId: string): Promise<AxiosResponse<IKanbanBoardData>> {
    return this.instance.get(`/kanbanboard/getOneKanbanBoard/${kanbanBoardId}`)
  }

  createKanbanBoard(
    newKanbanBoard: Partial<IKanbanBoardData>
  ): Promise<AxiosResponse<IKanbanBoardData[]>> {
    return this.instance.post('/kanbanboard/createKanbanBoard', newKanbanBoard)
  }

  updateKanbanBoard(
    KanbanBoardId: string,
    editedContent: object
  ): Promise<AxiosResponse<IKanbanBoardData>> {
    return this.instance.put(`/kanbanboard/updateKanbanBoard/${KanbanBoardId}`, editedContent)
  }
}

const kanbanservices = new KanbanServices()
export default kanbanservices
