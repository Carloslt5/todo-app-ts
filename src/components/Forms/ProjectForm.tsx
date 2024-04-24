import { KanbanContext, KanbanContextType } from '@/contexts/kanban.context'
import { ProjectData } from '@/interfaces/Project.type'
import { ValidationError } from '@/interfaces/ValidationError.type'
import projectservices from '@/services/project.services'
import { AxiosError } from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface ProjecFormProprs {
  kanbanID: string
  modalTitle: string
  onCancel: () => void
}

const ProjectForm: React.FC<ProjecFormProprs> = ({ modalTitle, kanbanID, onCancel }) => {
  const { kanbanBoardId } = useParams()
  const { loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const handleCancel = () => {
    onCancel()
  }

  const projectForm = useForm<Partial<ProjectData>>({
    defaultValues: {
      title: '',
      description: '',
    },
  })
  const { register, handleSubmit } = projectForm
  const [projectErrors, setProjectErrors] = useState<ValidationError[]>([])

  const submitHandler = async (newProjectData: Partial<ProjectData>) => {
    try {
      if (kanbanBoardId) {
        await projectservices.createProject(newProjectData, kanbanID)
        handleCancel()
        loadKanbanBoard(kanbanBoardId)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          toast.error(error.response?.data.message)
        }
        setProjectErrors(error.response?.data)
      }
    }
  }

  return (
    <div className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white '>{modalTitle}</h1>
      </div>
      <hr className='mb-4' />
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(submitHandler)}>
        <input
          autoFocus
          className='input-standard text-slate-700 dark:text-zinc-700'
          type='text'
          placeholder='Insert title...'
          {...register('title')}
          required
        />
        {projectErrors.length > 0 &&
          projectErrors
            .filter((error) => error.path[1] === 'title')
            .map((error, index) => (
              <p key={index} className='form-error'>
                {error.message}
              </p>
            ))}
        <textarea
          className='h-10 input-standard text-zinc-700 dark:text-zinc-700 max-h-32'
          placeholder='Insert description...'
          {...register('description')}
        />
        {projectErrors.length > 0 &&
          projectErrors
            .filter((error) => error.path[1] === 'description')
            .map((error, index) => (
              <p key={index} className='form-error'>
                {error.message}
              </p>
            ))}
        <div className='flex flex-row-reverse items-center gap-2 items-strech'>
          <button className='flex items-center btn-add'>
            <span>Add Project</span>
          </button>
          <button className='btn-cancel' onClick={handleCancel}>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
