import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ITicketData } from '../interfaces/Ticket.type'

class TicketServices {
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
  getTicket(projectId: string) {
    return this.instance.get(`/ticket/getTicket/${projectId}`)
  }

  createdTicket(projectId: string, stateId: string, newTicket: object) {
    return this.instance.post(`/ticket/createdTicket/${projectId}`, { stateId, newTicket })
  }

  updateTicketDetails(ticketID: string, editedContent: Partial<ITicketData>) {
    return this.instance.put(`/ticket/updateTicketDetails/${ticketID}`, editedContent)
  }

  updateStateTicket(ticketId: string, stateId: string): Promise<AxiosResponse<ITicketData>> {
    return this.instance.put('/ticket/updateStateTicket', { ticketId, stateId })
  }

  deleteTicket(ticketId: string) {
    return this.instance.delete(`/ticket/deleteTicket/${ticketId}`)
  }
}

const ticketservices = new TicketServices()
export default ticketservices
