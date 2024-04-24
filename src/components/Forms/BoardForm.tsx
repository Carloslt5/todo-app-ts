import { IKanbanBoardData } from '@/interfaces/KanbanBoard.type'
import { ValidationError } from '@/interfaces/ValidationError.type'
import kanbanservices from '@/services/kanban.services'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface BoardFormProps {
  modalTitle: string
  loadBoard: () => void
  onCancel: () => void
}

const BoardForm: React.FC<BoardFormProps> = ({ modalTitle, loadBoard, onCancel }) => {
  const handleCancel = () => onCancel()

  const boardForm = useForm<IKanbanBoardData>({
    defaultValues: {
      title: '',
    },
  })

  const { register, handleSubmit } = boardForm
  const [boardErrors, setBoardErrors] = useState<ValidationError[]>([])

  const submitHandler = async (boardData: IKanbanBoardData) => {
    try {
      await kanbanservices.createKanbanBoard(boardData)
      handleCancel()
      loadBoard()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 422) {
          toast.error(error.response.data.message)
        }
        setBoardErrors(error.response?.data)
      }
    }
  }

  return (
    <div className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white'>{modalTitle}</h1>
      </div>
      <hr className='mb-4' />

      <form className='flex flex-col gap-4 text-slate-500' onSubmit={handleSubmit(submitHandler)}>
        <input
          autoFocus
          className='input-standard text-zinc-700 dark:text-zinc-700'
          type='text'
          placeholder='Insert Board...'
          {...register('title')}
        />
        {boardErrors.length > 0 &&
          boardErrors.map((error, index) => (
            <p key={index} className='form-error'>
              {error.message}
            </p>
          ))}
        <div className='flex flex-row-reverse items-center gap-2 items-strech'>
          <button type='submit' className='flex items-center btn-add'>
            <span>Add Board</span>
          </button>
          <button className='btn-cancel' onClick={handleCancel}>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default BoardForm
