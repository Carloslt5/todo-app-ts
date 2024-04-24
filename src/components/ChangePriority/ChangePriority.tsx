import { getPriorityColor } from '@/const/Ticket-Priority'
import { ITicketData } from '@/interfaces/Ticket.type'
import { useState } from 'react'

interface ChangeDetails {
  data: ITicketData
  entityId: string
  updateEntity: (entityId: string) => void
  updateEntityPriority: (ticketID: string, newPriority: string) => Promise<void>
}

const priorityOptions = ['Low', 'Medium', 'High']

const ChangePriority: React.FC<ChangeDetails> = ({
  data: { _id: ticketID, priority },
  entityId,
  updateEntity,
  updateEntityPriority,
}) => {
  const [selectedPriority, setSelectedPriority] = useState(priority)

  const handlePriorityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = event.target.value
    setSelectedPriority(newPriority)

    try {
      await updateEntityPriority(ticketID, newPriority)
      updateEntity(entityId)
    } catch (error) {
      console.log(error)
    }
  }

  const priorityColor = getPriorityColor(priority)

  return (
    <article className='flex items-center w-full gap-2 py-1 text-sm'>
      <p>Priority:</p>
      <div className={`${priorityColor} h-4 w-4 rounded-full`} />
      <select className='text-slate-500' value={selectedPriority} onChange={handlePriorityChange}>
        {priorityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </article>
  )
}

export default ChangePriority
