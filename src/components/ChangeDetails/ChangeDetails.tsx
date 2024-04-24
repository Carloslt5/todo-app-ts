import { EditedContent } from '@/contexts/ticket.context'
import { useEditing } from '@/hooks/useEditing-Hook'
import { ITicketData } from '@/interfaces/Ticket.type'
import { ValidationError } from '@/interfaces/ValidationError.type'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ChangeDetails {
  data: ITicketData
  entityId: string
  updateEntity: (entityId: string) => void
  updateEntityDetails: (ticketID: string, editedContent: EditedContent) => Promise<void>
}

const ChangeDetails: React.FC<ChangeDetails> = ({
  data: { _id: ticketID, description },
  entityId,
  updateEntityDetails,
  updateEntity,
}) => {
  const { isEditing, setEditing, handlerEditClick } = useEditing()

  const detailsForm = useForm({
    defaultValues: {
      description: description,
    },
  })

  const { register, handleSubmit } = detailsForm
  const [changeDetailsErrors, setChangeDetailsErrors] = useState<ValidationError[]>([])

  const submitHandler = async (editedContent: EditedContent) => {
    try {
      await updateEntityDetails(ticketID, editedContent)
      setEditing(false)
      updateEntity(entityId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setChangeDetailsErrors(error.response?.data)
      }
      setEditing(true)
    }
  }

  return (
    <>
      {!isEditing ? (
        <article className='p-2 text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
          <p onClick={handlerEditClick}>{description}</p>
        </article>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <textarea
            autoFocus
            className='p-2 mb-2 text-base border-none max-h-40 input-standard dark:text-zinc-700 '
            placeholder={description}
            {...register('description')}
            required
          />
          {changeDetailsErrors.length > 0 &&
            changeDetailsErrors.map((error, index) => (
              <p key={index} className=' form-error'>
                {error.message}
              </p>
            ))}
          <section className='flex flex-row-reverse items-center justify-start w-full gap-3'>
            <button type='submit' className='btn-add '>
              Save Description
            </button>
            <button className='btn-cancel' onClick={handlerEditClick}>
              Cancel
            </button>
          </section>
        </form>
      )}
    </>
  )
}

export default ChangeDetails
