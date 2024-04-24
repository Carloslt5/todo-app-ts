import { TICKET_PRIORITY } from '@/const/Ticket-Priority'
import { EditedContent, TicketContext, TicketContextType } from '@/contexts/ticket.context'
import { IState } from '@/interfaces/State.type'
import ticketservices from '@/services/ticket.services'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ValidationError } from '@/interfaces/ValidationError.type'
import { AxiosError } from 'axios'

interface NewTicketFormProps {
  data: IState
  onCancel: () => void
}
const NewTicketForm: React.FC<NewTicketFormProps> = ({ onCancel, data: { _id: stateID } }) => {
  const { projectId } = useParams()
  const { loadTicket } = useContext(TicketContext) as TicketContextType
  const handleCancel = () => onCancel()

  const newTicketData = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Low',
    },
  })

  const { register, handleSubmit } = newTicketData
  const [newTicketErrors, setNewTicketrrors] = useState<ValidationError[]>([])

  const onSubmit = async (newTicketData: EditedContent) => {
    try {
      if (projectId) {
        await ticketservices.createdTicket(projectId, stateID, newTicketData)
        handleCancel()
        loadTicket(projectId)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setNewTicketrrors(error.response?.data)
      }
    }
  }

  return (
    <div className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white '>New Ticket</h1>
      </div>
      <hr className='mb-4' />
      <form className='flex flex-col gap-2 text-slate-500 ' onSubmit={handleSubmit(onSubmit)}>
        <input
          autoFocus
          className='input-standard text-zinc-700 dark:text-zinc-700'
          type='text'
          placeholder='Insert title...'
          {...register('title')}
          required
        />
        <textarea
          className='input-standard min-h-[50px] max-h-32 text-zinc-700 dark:text-zinc-700 '
          placeholder='Insert description...'
          {...register('description')}
          required
        />
        <ul className='flex items-center gap-2'>
          <p>Priority:</p>
          {TICKET_PRIORITY.map((el, index) => (
            <li key={index}>
              <input
                id={`checkbox${index}`}
                type='radio'
                value={el}
                {...register('priority')}
                defaultChecked={el === 'Low'}
              />
              <label
                className='inline-block pl-[0.15rem] hover:cursor-pointer'
                htmlFor={`checkbox${index}`}
              >
                {el}
              </label>
            </li>
          ))}
        </ul>
        <div>
          {newTicketErrors.length > 0 &&
            newTicketErrors.map((elem, index) => (
              <p key={index} className='form-error'>
                {elem.message}
              </p>
            ))}
        </div>
        <div className='flex flex-row-reverse items-center gap-2 mt-4 items-strech'>
          <button className='flex items-center btn-add'>
            <span>Create Ticket</span>
          </button>
          <button className='btn-cancel' onClick={handleCancel}>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewTicketForm
