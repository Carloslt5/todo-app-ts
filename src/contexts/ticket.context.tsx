import { ITicketData } from '@/interfaces/Ticket.type'
import stateservices from '@/services/state.services'
import ticketservices from '@/services/ticket.services'
import { AxiosError } from 'axios'
import { createContext, ReactNode, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export interface EditedContent {
  _id?: string
  title?: string
  description?: string
  priority?: string
}

export interface TicketContextType {
  ticketData: ITicketData[] | null
  setTicketData: React.Dispatch<React.SetStateAction<ITicketData[] | null>>
  loadTicket: (projectId: string) => Promise<void>
  deleteTicket: (ticketId: string, projectId: string) => Promise<void>
  deleteState: (stateID: string) => Promise<void>
  updateTickettTitle: (projectId: string, editedContent: EditedContent) => Promise<void>
  updateTicketPriority: (ticketID: string, priority: string) => Promise<void>
  updateTicketDetails: (ticketID: string, editedContent: EditedContent) => Promise<void>
}

export const TicketContext = createContext<TicketContextType | null>(null)

export function TicketProviderWrapper({ children }: { children: ReactNode }) {
  const [ticketData, setTicketData] = useState<ITicketData[] | null>(null)

  const loadTicket = useCallback(async (projectId: string) => {
    try {
      if (projectId) {
        const { data } = await ticketservices.getTicket(projectId)
        setTicketData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const deleteTicket = async (ticketId: string, projectId: string) => {
    try {
      await ticketservices.deleteTicket(ticketId)
      loadTicket(projectId)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  const deleteState = async (stateID: string) => {
    try {
      await stateservices.deleteState(stateID)
    } catch (error) {
      console.log('context-', error)
      throw Error
    }
  }

  const updateTickettTitle = async (ticketID: string, editedContent: EditedContent) => {
    await ticketservices.updateTicketDetails(ticketID, editedContent)
  }

  const updateTicketPriority = async (ticketID: string, priority: string) => {
    try {
      await ticketservices.updateTicketDetails(ticketID, { priority })
    } catch (error) {
      console.log(error)
    }
  }

  const updateTicketDetails = async (ticketID: string, editedContent: EditedContent) => {
    await ticketservices.updateTicketDetails(ticketID, editedContent)
  }

  const value = {
    ticketData,
    setTicketData,
    loadTicket,
    deleteTicket,
    deleteState,
    updateTicketPriority,
    updateTickettTitle,
    updateTicketDetails,
  }

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}
