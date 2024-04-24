import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ProjectData } from '../interfaces/Project.type'

class ProjectServices {
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

  getOneProject(projectId: string): Promise<AxiosResponse<ProjectData>> {
    return this.instance.get(`/project/getOneProject/${projectId}`)
  }

  createProject(newProjectData: object, kanbanID: string): Promise<AxiosResponse<ProjectData>> {
    return this.instance.post(`/project/createProject/${kanbanID}`, newProjectData)
  }

  updateProject(projectId: string, editedContent: object): Promise<AxiosResponse<ProjectData>> {
    return this.instance.put(`/project/updateProject/${projectId}`, editedContent)
  }

  updateOrderSates(projectId: string, orderInfo: object) {
    return this.instance.put(`/project/updateOrderSates/${projectId}`, orderInfo)
  }

  deleteProject(projectId: string) {
    return this.instance.delete(`/project/deleteProject/${projectId}`)
  }
}

const projectservices = new ProjectServices()
export default projectservices
