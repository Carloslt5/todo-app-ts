import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ProjectData } from '../types/Project.type'

class ProjectServices {

  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_API_URL
    })

    this.instance.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers['Authorization'] = `Bearer ${storedToken}`
      }

      return config
    }, (error) => {
      return Promise.reject(error)
    })
  }

  createProject(newProjectData: object, kanbanID: string): Promise<AxiosResponse<ProjectData>> {
    return this.instance.post(`/project/createProject/${kanbanID}`, newProjectData)
  }

}

const projectservices = new ProjectServices()
export default projectservices