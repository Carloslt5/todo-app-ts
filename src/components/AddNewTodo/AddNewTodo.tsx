import { ITicketData } from '@/interfaces/Ticket.type'
import { useAddTodo } from '../../hooks/useAddTodo-Hook'

const AddNewTodo: React.FC<ITicketData> = ({ _id: ticketID }) => {
  const { register, handleSubmit, newTicketErrors, todoSubmithandler } = useAddTodo(ticketID)

  return (
    <>
      <form className='flex flex-col gap-3 md:flex-row' onSubmit={handleSubmit(todoSubmithandler)}>
        <input
          className='input-standard text-slate-700 dark:text-zinc-800'
          type='text'
          placeholder='Insert Task...'
          {...register('title')}
        />
        <button className='btn-form' type='submit'>
          Add
        </button>
      </form>
      {newTicketErrors.length > 0 &&
        newTicketErrors.map((error, index) => (
          <p key={index} className='form-error'>
            {error.message}
          </p>
        ))}
    </>
  )
}

export default AddNewTodo
