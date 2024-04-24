import { ProjectContext, ProjectContextType } from '@/contexts/project.context'
import { ValidationError } from '@/interfaces/ValidationError.type'
import stateservices from '@/services/state.services'
import { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

interface NewStateFormProps {
  modalTitle: string
  onCancel: () => void
}

const NewStateForm: React.FC<NewStateFormProps> = ({ modalTitle, onCancel }) => {
  const handleCancel = () => onCancel()

  const { projectId } = useParams()
  const { loadProject } = useContext(ProjectContext) as ProjectContextType

  const [newStateData, setNewStateData] = useState({
    stateName: '',
  })
  const [stateError, setStateError] = useState<ValidationError[]>([])
  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewStateData({ ...newStateData, [name]: value })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (projectId) {
        await stateservices.createState(projectId, newStateData)
        loadProject(projectId)
        handleCancel()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setStateError(error.response?.data)
      }
    }
  }

  return (
    <>
      <div className='modal-form'>
        <div className='flex justify-between'>
          <h1 className='text-2xl text-white '>{modalTitle}</h1>
        </div>
        <hr className='mb-4' />
        <form className='flex flex-col ' onSubmit={todoSubmithandler}>
          <input
            autoFocus
            className='input-standard text-zinc-700'
            type='text'
            name='stateName'
            placeholder='New State...'
            onChange={handlerInputChange}
          />

          {stateError.length > 0 &&
            stateError.map((elem, index) => (
              <p key={index} className='form-error'>
                {elem.message}
              </p>
            ))}

          <div className='flex flex-row-reverse items-center gap-2 mt-4 items-strech'>
            <button className='flex items-center btn-add'>
              <span>Add State</span>
            </button>
            <button className='btn-cancel' onClick={handleCancel}>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewStateForm
