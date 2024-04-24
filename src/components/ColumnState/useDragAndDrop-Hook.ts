import { TicketContext, TicketContextType } from '@/contexts/ticket.context'
import { IState } from '@/interfaces/State.type'
import { ITicketData } from '@/interfaces/Ticket.type'
import ticketservices from '@/services/ticket.services'
import { useContext } from 'react'
import { useDrop } from 'react-dnd'

export const useDragAndDrop = (state: IState) => {
  const { ticketData, setTicketData } = useContext(TicketContext) as TicketContextType

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'Ticket',
    drop: (ticket: ITicketData) => addItemToSection(ticket),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addItemToSection = (ticketToAdd: ITicketData) => {
    setTicketData((prev) => {
      const updateTicket = prev?.map((ticket) => {
        if (ticket._id === ticketToAdd._id) {
          return { ...ticket, state: state }
        }
        return ticket
      })
      return updateTicket || null
    })
    ticketservices.updateStateTicket(ticketToAdd._id, state._id)
  }
  return {
    ticketData,
    isOver,
    drop,
    addItemToSection,
  }
}
