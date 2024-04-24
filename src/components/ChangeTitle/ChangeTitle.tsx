import { EditedContent } from '@/contexts/ticket.context'
import { useEditing } from '@/hooks/useEditing-Hook'
import { IKanbanBoardData } from '@/interfaces/KanbanBoard.type'
import { ProjectData } from '@/interfaces/Project.type'
import { ITicketData } from '@/interfaces/Ticket.type'
import { TodoData } from '@/interfaces/Todo.type'
import { ValidationError } from '@/interfaces/ValidationError.type'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdClose, MdModeEdit } from 'react-icons/md'
import { toast } from 'react-toastify'

interface ChangeTitleProps {
  data: ITicketData | IKanbanBoardData | ProjectData | TodoData
  entityId: string
  variant?: 'title-page'
  updateEntity: (entityId: string) => void
  updateEntityTitle: (entityId: string, editedContent: EditedContent) => Promise<void>
}

const ChangeTitle: React.FC<ChangeTitleProps> = ({
  data: { _id, title },
  entityId,
  variant,
  updateEntityTitle,
  updateEntity,
}) => {
  const { isEditing, setEditing, handlerEditClick } = useEditing()

  const editContent = useForm({
    defaultValues: {
      _id: _id,
      title: title,
    },
  })

  const { register, handleSubmit } = editContent
  const [changeTitleErrors, setChangeTitleErrors] = useState<ValidationError[]>([])

  const submitHandler = async (editedContent: EditedContent): Promise<void> => {
    try {
      await updateEntityTitle(_id, editedContent)
      setEditing(false)
      updateEntity(entityId)
      setChangeTitleErrors([])
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          toast.error(error.response.data.message)
        }
        setChangeTitleErrors(error.response?.data)
      }
      setEditing(true)
    }
  }

  const titleClassName =
    variant === 'title-page'
      ? 'title-primary '
      : 'input-standard text-slate-100 dark:text-zinc-100'
  const inputClassName =
    variant === 'title-page' ? 'input-primary' : 'input-standard text-slate-700 dark:text-zinc-700'
  const buttonClassName = variant === 'title-page' ? 'p-6' : 'p-2'

  return (
    <article className='flex flex-col w-full'>
      <div className='flex items-stretch justify-between w-full gap-2'>
        {!isEditing ? (
          <h1 className={titleClassName} onClick={handlerEditClick}>
            {title}
          </h1>
        ) : (
          <form className='flex w-full text-2x ' onSubmit={handleSubmit(submitHandler)}>
            <input
              autoFocus
              type='text'
              {...register('title')}
              className={inputClassName}
              placeholder={title}
              onBlur={handlerEditClick}
              required
            />
          </form>
        )}
        <div className='edit-title'>
          <button className={buttonClassName} onClick={handlerEditClick}>
            {isEditing ? <MdClose /> : <MdModeEdit />}
          </button>
        </div>
      </div>
      {changeTitleErrors.length > 0 &&
        changeTitleErrors.map((error, index) => (
          <p key={index} className=' form-error'>
            {error.message}
          </p>
        ))}
    </article>
  )
}

export default ChangeTitle
